// import { Inject, Injectable } from "@nestjs/common";
// import UpsertAndReturnPointService from "src/modules/point/src/application/upsert.and.return.point.service";
// import AssociatePointToUserService from "./associate.point.to.user.service";
// import FindOneUserByService from "../domain/services/find.one.user.by.id.service";

// @Injectable({})
// export default class ToggleAndReturnUserLocationService {

//     public constructor(
//         @Inject(FindOneUserByService)
//         private readonly findOneUserByService: FindOneUserByService,
//         @Inject(UpsertAndReturnPointService)
//         private readonly upsertAndReturnPointService: UpsertAndReturnPointService,
//         @Inject(AssociatePointToUserService)
//         private readonly associatePointToUserService: AssociatePointToUserService,
//     ) { };

//     public async execute(params: {
//         id: string;
//         coordinates: {
//             latitude: number;
//             longitude: number;
//         };
//     }) {

//         const { id, coordinates } = params;

//         try {

//             if (!id) {

//                 throw new Error(`${ToggleAndReturnUserLocationService.name}Err: params.id is required`);

//             };

//             if (!coordinates) {

//                 throw new Error(`${ToggleAndReturnUserLocationService.name}Err: params.coordinates is required`);

//             };

//             const user = await this.findOneUserByService.execute({ id });

//             const pointId = user.pointId;

//             const point = await this.upsertAndReturnPointService.execute({
//                 id: pointId as unknown as string,
//                 upsertPointParams: {
//                     shared: true,
//                     coordinates,
//                 },
//             });

//             await this.associatePointToUserService.execute({ userId: id, pointId: point[0].id });

//             return point;

//         } catch (error) {

//             throw error;

//         };

//     };

// };