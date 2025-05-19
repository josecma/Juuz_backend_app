// import { Inject, Injectable } from "@nestjs/common";
// import RequiredParamException from "src/modules/shared/src/domain/exceptions/required.param.exception";
// import UserRepository from "../../infrastructure/user.repository";

// @Injectable({})
// export default class UpdateUserService {

//     public constructor(
//         @Inject(UserRepository)
//         private readonly userRepository: UserRepository,
//     ) { };

//     public async execute(params: {
//         id: string;
//         updateObj: {
//             share?: boolean;
//             coordinates?: {
//                 latitude: number;
//                 longitude: number;
//             };
//         };
//     }) {

//         const { id } = params;

//         try {

//             if (!id) {

//                 throw new RequiredParamException(
//                     {
//                         name: `${UpdateUserService.name}Err`,
//                         requiredParams: ["id"],
//                     }
//                 );

//             };

//         } catch (error) {

//         };

//     };

// };