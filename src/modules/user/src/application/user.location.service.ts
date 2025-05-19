// import { InternalErrorException } from "@aws-sdk/client-sns";
// import { Inject, Injectable, NotFoundException } from "@nestjs/common";
// import FindOnePointByService from "src/modules/point/src/application/find.one.point.by.service";
// import FindOneUserByService from "../domain/services/find.one.user.by.id.service";

// @Injectable()
// export default class UserLocationService {

//     public constructor(
//         @Inject(FindOneUserByService)
//         private readonly findOneUserByService: FindOneUserByService,
//         @Inject(FindOnePointByService)
//         private readonly findOnePointByService: FindOnePointByService,
//     ) { };

//     public async execute(params: { id: string; }) {

//         const { id } = params;

//         try {

//             if (!id) {

//                 throw new Error(`${UserLocationService.name}Err: params is required`);

//             };

//             const user = await this.findOneUserByService.execute({ id });

//             const pointId = user.pointId;

//             if (!pointId) {

//                 throw new Error(`${UserLocationService.name}Err: user with id:${user.id} has not associated point`);

//             };

//             const point = await this.findOnePointByService.execute({
//                 id: pointId as unknown as string
//             });

//             return point;

//         } catch (error) {

//             if (error instanceof NotFoundException) {

//                 throw error;

//             };

//             throw new InternalErrorException(error);

//         };

//     };

// };