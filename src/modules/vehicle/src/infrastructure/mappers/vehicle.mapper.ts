import { Prisma } from "@prisma/client";

export default class VehicleMapper {

    static to(
        orm: Prisma.VehicleGetPayload<{
            include: {
                pictures: {
                    include: {
                        file: true,
                    }
                },
                vehicleInfo: {
                    include: {
                        model: {
                            include: {
                                make: true,
                            }
                        }
                    }
                }
            }
        }>
    ) {

        const {
            pictures,
            vehicleInfo,
            ...vehicleRes
        } = orm;


        return Object.assign(
            {},
            vehicleRes,
            {
                model: {
                    id: vehicleInfo.model.id,
                    name: vehicleInfo.model.name,
                },
                brand: {
                    id: vehicleInfo.model.makeId,
                    name: vehicleInfo.model.make.name,
                },
            },
            {
                pictures: pictures.map(

                    (e) => {

                        const { id, key } = e.file;

                        return {
                            id,
                            key,
                        };
                    }

                )
            }
        );

    };

};