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
                                brand: true,
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
                    id: vehicleInfo.model.brand.id,
                    name: vehicleInfo.model.brand.name,
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