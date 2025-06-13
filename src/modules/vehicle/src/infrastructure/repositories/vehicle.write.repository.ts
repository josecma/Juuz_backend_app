import { Inject, Injectable, Logger } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { SaveFile } from "src/modules/shared/src/domain/types/save.file";

@Injectable({})
export default class VehicleWriteRepository {

    private readonly logger = new Logger(VehicleWriteRepository.name);

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async deleteOneById(
        vehicleId: string
    ) {

        try {

            this.client.$transaction(
                async (tx) => {

                    const vehiclePicturesResponse = await tx.vehiclePicture.findMany(
                        {
                            where: {
                                vehicleId,
                            }
                        }
                    );

                    await tx.vehiclePicture.deleteMany(
                        {
                            where: {
                                vehicleId,
                            }
                        }
                    );

                    await tx.file.deleteMany(
                        {
                            where: {
                                id: {
                                    in: vehiclePicturesResponse.map(
                                        (e) => e.fileId
                                    )
                                }
                            }
                        }
                    );

                    await tx.vehicle.delete(
                        {
                            where: {
                                id: vehicleId,
                            }
                        }
                    );

                }

            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleWriteRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async save(
        params: {
            ownerId: string,
            vehicle: {
                vinNumber: string,
                year: number,
                vehicleType: string,
                capacity: number
            },
            pictures: Array<SaveFile>,
            modelId: string,
        }
    ) {

        const {
            ownerId,
            vehicle,
            pictures,
            modelId
        } = params;

        try {

            const res = await this.client.$transaction(

                async (tx) => {

                    const saveVehicleInfoResponse = await tx.vehicleInfo.create(
                        {
                            data: {
                                modelId,
                            }
                        }
                    );

                    const saveVehicleResponse = await tx.vehicle.create(
                        {
                            data: Object.assign(
                                {
                                    ...vehicle,
                                    vehicleInfoId: saveVehicleInfoResponse.id,
                                    ownerId,
                                }
                            ),
                        }
                    );

                    const saveFileResponse = await Promise.all(

                        pictures.map(

                            async (picture) => {

                                const {
                                    uniqueName,
                                    mimeType,
                                    metadata,
                                    eTag,
                                    size,
                                } = picture;

                                return await tx.file.create(
                                    {
                                        data: {
                                            key: uniqueName,
                                            eTag,
                                            mimeType,
                                            size: size.toString(),
                                            metadata: metadata as Prisma.JsonValue ?? {},
                                        }
                                    }
                                );

                            }

                        )

                    );

                    await tx.vehiclePicture.createMany(
                        {
                            data: saveFileResponse.map(

                                (file) => {

                                    const {
                                        id
                                    } = file;

                                    return {
                                        fileId: id,
                                        vehicleId: saveVehicleResponse.id,
                                    };

                                }

                            )

                        }

                    );

                    return saveVehicleResponse;

                }

            );

            return res;

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleWriteRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async update(
        params: {
            id: string,
            vehicle?: {
                vinNumber?: string,
                year?: number,
                vehicleType?: string,
                capacity?: number
            },
            fileIdsToDelete: Array<string>,
            pictures?: Array<SaveFile>,
            modelId?: string,
        }
    ) {

        const {
            id,
            vehicle,
            pictures,
            modelId,
            fileIdsToDelete,
        } = params;

        try {

            await this.client.$transaction(

                async (tx) => {

                    if (fileIdsToDelete.length > 0) {

                        await tx.vehiclePicture.deleteMany(
                            {
                                where: {
                                    fileId: {
                                        in: fileIdsToDelete,
                                    }
                                },

                            }
                        );

                        await tx.file.deleteMany(
                            {
                                where: {
                                    id: {
                                        in: fileIdsToDelete,
                                    }
                                }
                            }
                        );

                    };

                    if (pictures?.length > 0) {

                        const saveFileResponse = await Promise.all(

                            pictures.map(

                                async (picture) => {

                                    const {
                                        uniqueName,
                                        mimeType,
                                        metadata,
                                        eTag,
                                        size,
                                    } = picture;

                                    return await tx.file.create(
                                        {
                                            data: {
                                                key: uniqueName,
                                                eTag,
                                                mimeType,
                                                size: size.toString(),
                                                metadata: metadata as Prisma.JsonValue ?? {},
                                            }
                                        }
                                    );

                                }

                            )

                        );

                        await tx.vehiclePicture.createMany(
                            {
                                data: saveFileResponse.map(

                                    (file) => {

                                        return {
                                            fileId: file.id,
                                            vehicleId: id,
                                        };

                                    }

                                )

                            }

                        );

                    };

                    await tx.vehicle.update(
                        {
                            where: {
                                id,
                            },
                            data: {
                                ...vehicle,
                                vehicleInfo: {
                                    update: {
                                        data: {
                                            modelId
                                        }
                                    }
                                }
                            }
                        }
                    );

                }

            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleWriteRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};