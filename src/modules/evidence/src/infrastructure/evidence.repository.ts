import { Inject, Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import Evidence from "../domain/evidence";
import { UpdateEvidenceJSON } from "../domain/types";
import EvidenceMapper from "./mappers/evidence.mapper";
import { SaveFile } from "src/modules/shared/src/domain/types/save.file";

@Injectable({})
export default class EvidenceRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findByFileKeys(
        keys: Array<string>,
    ) {

        try {

            const res = await this.client.evidence.findMany({
                where: {
                    evidenceFiles: {
                        some: {
                            file: {
                                key: {
                                    in: keys
                                }
                            }
                        }
                    }
                },
                include: {
                    evidenceFiles: {
                        include: {
                            file: true
                        }
                    }
                }
            });

            return res.map((e) => EvidenceMapper.to({ ...e }));

        } catch (error) {

            throw error;

        };

    };

    public async findBy(
        params: {
            pagination?: {
                page: number;
                limit: number;
            };
            findByObj: {
                userId?: string;
                status?: boolean;
                orderId?: string;
                type?: string;
            };
        }
    ) {

        const { pagination, findByObj } = params;

        const { userId, type, orderId, status } = findByObj;

        const evidenceWhereInput: Prisma.EvidenceWhereInput = {
            ...(userId && { userId: userId }),
            ...(orderId && { orderId: orderId }),
            ...(type && { type }),
            ...(status !== undefined && { status }),
        };

        const offset = pagination ? (pagination.page - 1) * pagination.limit : 0;
        const take = pagination ? pagination.limit : 10;

        try {

            const res = await this.client.evidence.findMany({
                where: evidenceWhereInput,
                include: {
                    evidenceFiles: {
                        include: {
                            file: true
                        }
                    }
                },
                skip: offset,
                take: take,
            });

            return res.map((e) => EvidenceMapper.to({ ...e }));

        } catch (error) {

            throw error;

        };

    };

    public async save(
        params: {
            userId: string;
            orderId: string;
            evidence: Evidence;
            files: Array<SaveFile>,
        }
    ): Promise<void> {

        const { userId, orderId, evidence, files } = params;

        const { description, geoPoint, status, type } = evidence.toJSON();

        try {

            await this.client.$transaction(async (tx) => {

                const evidence = await tx.evidence.create({
                    data: {
                        description,
                        coordinates: geoPoint,
                        type,
                        status,
                        userId: userId,
                        orderId: orderId,
                    },
                });

                const savedFiles = await Promise.all(
                    files.map(
                        async (file) => {

                            const { uniqueName, mimeType, metadata, size, eTag } = file;

                            return await tx.file.upsert({
                                where: {
                                    key: uniqueName
                                },
                                update: {
                                    key: uniqueName,
                                    eTag,
                                    mimeType: mimeType,
                                    metadata: metadata as Prisma.JsonValue,
                                    size: size.toString()
                                },
                                create: {
                                    key: uniqueName,
                                    eTag,
                                    mimeType: mimeType,
                                    metadata: metadata as Prisma.JsonValue,
                                    size: size.toString()
                                }
                            });
                        }));

                const evidenceId = evidence.id;

                await tx.evidenceFile.createMany({
                    data: savedFiles.map((savedFile) => {
                        return {
                            evidenceId,
                            fileId: savedFile.id,
                        };
                    }),
                });

            });

        } catch (error) {

            throw error;

        };

    };

    public async update(
        params: {
            id: string;
            updateObj: UpdateEvidenceJSON;
        }
    ): Promise<void> {

        const { id, updateObj } = params;

        try {

            await this.client.evidence.update({
                data: updateObj,
                where: {
                    id: id,
                },
            });

        } catch (error) {

            throw error;

        };

    };

    public async findOneBy(
        params: {
            id: string;
        }
    ) {

        const { id } = params;

        try {

            return await this.client.evidence.findUnique({
                where: {
                    id: id,
                },
                include: {
                    order: true,
                    evidenceFiles: {
                        include: {
                            file: true,
                        },
                    },
                },
            });

        } catch (error) {

            throw error;

        };

    };


    // public async save(params: {
    //     userId: string;
    //     orderId: string;
    //     evidence: Evidence;
    // }): Promise<void> {

    //     const { userId, orderId, evidence } = params;

    //     const { description, geoPoint, status, of } = evidence.toJSON();

    //     let keyAndMetadata: Map<string, Record<string, any>> = new Map();

    //     try {

    //         keyAndMetadata = await this.storageProvider.uploadFiles(evidence.getFiles());

    //         const t = await this.client.$transaction(async (tx) => {

    //             const evidence = await tx.evidence.create({
    //                 data: {
    //                     description: description,
    //                     coordinates: geoPoint,
    //                     status: status,
    //                     userId: Number(userId),
    //                     orderId: Number(orderId),
    //                 },
    //             });

    //             const etags: string[] = Array.from(keyAndMetadata.values()).map((e) => e.etag);

    //             const existFiles = await tx.file.findMany({ where: { key: { in: etags } } });

    //             const filterEtags = etags.filter(e => !existFiles.find(ef => ef.key === e));

    //             if (filterEtags.length > 0) {
    //                 await tx.file.createMany({
    //                     data: filterEtags.map((etag) => {
    //                         return {
    //                             evidenceId: evidence.id,
    //                             key: etag,
    //                             metadata: {},
    //                         };
    //                     })
    //                 });
    //             } else {

    //                 throw new Error(`new upload image is required`);

    //             };

    //         });

    //     } catch (error) {

    //         await this.storageProvider.deleteFiles(Array.from(keyAndMetadata.keys()));

    //         throw error;

    //     };

    // };


};