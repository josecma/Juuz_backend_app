// import { Inject, Injectable } from "@nestjs/common";
// import UserRepository from "../infrastructure/user.repository";

// @Injectable()
// export default class FindUserService {

//     public constructor(
//         @Inject()
//         private readonly userRepository: UserRepository,
//     ) { };

//     public async execute(params: { ids: number[]; }) {

//         const { ids } = params;

//         try {

//             const users = await this.userRepository.find({ ids });

//             return users;

//         } catch (error) {

//             throw new Error(error);

//         };

//     };

// };