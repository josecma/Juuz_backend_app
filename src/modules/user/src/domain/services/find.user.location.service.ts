// import { InternalErrorException } from "@aws-sdk/client-sns";
// import { Inject, Injectable, NotFoundException } from "@nestjs/common";
// import RequiredParamException from "src/modules/shared/src/domain/exceptions/required.param.exception";
// import FindOneUserByIdService from "./find.one.user.by.id.service";

// @Injectable()
// export default class FindUserLocationService {

//     public constructor(
//         @Inject(FindOneUserByIdService)
//         private readonly findOneUserByIdService: FindOneUserByIdService,
//     ) { };

//     public async find(params: { id: string; }) {

//         const { id } = params;

//         try {

//             if (!id) {

//                 throw new RequiredParamException(
//                     {
//                         name: `${FindUserLocationService.name}Err`,
//                         requiredParams: ["id"],
//                     }
//                 );

//             };

//             const user = await this.findOneUserByIdService.find({ id });

//             return {
//                 share: user.userPoint.share,
//                 coordinates: {
//                     latitude: user.userPoint.point.latitude,
//                     longitude: user.userPoint.point.longitude,
//                 },
//             };

//         } catch (error) {

//             if (error instanceof NotFoundException) {

//                 throw error;

//             };

//             throw new InternalErrorException(error);

//         };

//     };

// };