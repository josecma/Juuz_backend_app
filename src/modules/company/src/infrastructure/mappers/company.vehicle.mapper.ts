import { Prisma } from "@prisma/client";
import VehicleMapper from "src/modules/vehicle/src/infrastructure/mappers/vehicle.mapper";

export default class CompanyVehicleMapper {

    static to(
        orm: Prisma.CompanyGetPayload<{
            include: {
                companyMembers: {
                    include: {
                        member: {
                            include: {
                                vehicles: {
                                    include: {
                                        pictures: {
                                            include: {
                                                file: true,
                                            },
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
                                },
                            }
                        }
                    }
                }
            }
        }>
    ) {

        const {
            companyMembers
        } = orm;

        const companyVehicles = companyMembers.flatMap(
            (companyMember) => companyMember.member.vehicles

        );

        return companyVehicles.map(
            (e) => VehicleMapper.to(e)
        );

    };

};