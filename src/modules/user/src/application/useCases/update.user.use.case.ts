// import { Injectable } from "@nestjs/common";
// import UserReadRepository from "../../infrastructure/repositories/user.read.repository";
// import UserWriteRepository from "../../infrastructure/repositories/user.write.repository";

// @Injectable({})
// export default class UpdateUserUseCase {

//     public constructor(
//         private readonly userReadRepository: UserReadRepository,
//         private readonly userWriteRepository: UserWriteRepository,
//     ) { };

//     public async execute(
//         params: {
//             id: string,
//             updateObj: {
//                 firstName: string,
//                 lastName: string,
//             },
//         }
//     ) {

//         const { id, coordinates } = params;

//         try {

//             const user = await this.findOneUserByIdService.find({ id });

//             return await this.userRepository.update({
//                 id,
//                 updateObj: {
//                     coordinates,
//                 }
//             });

//         } catch (error) {

//             throw error;

//         };

//     };

// };