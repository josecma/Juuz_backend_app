// import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
// import FindOnePointByService from "src/modules/point/src/application/find.one.point.by.service";
// import UserRepository from "../infrastructure/user.repository";
// import FindOneUserByService from "../domain/services/find.one.user.by.id.service";

// @Injectable({})
// export default class AssociatePointToUserService {

//     public constructor(
//         @Inject(UserRepository)
//         private readonly userRepository: UserRepository,
//         @Inject(FindOnePointByService)
//         private readonly findOnePointByService: FindOnePointByService,
//         @Inject(FindOneUserByService)
//         private readonly findOneUserByService: FindOneUserByService,
//     ) { };

//     public async execute(params: {
//         userId: string;
//         pointId: string;
//     }) {

//         const { userId, pointId } = params;

//         try {

//             if (!userId) {

//                 throw new Error(`${AssociatePointToUserService.name}Err: params.userId is required`);

//             };

//             if (!pointId) {

//                 throw new Error(`${AssociatePointToUserService.name}Err: params.pointId is required`);

//             };

//             await this.findOnePointByService.execute({ id: pointId });

//             await this.findOneUserByService.execute({ id: userId });

//             await this.userRepository.update({ id: userId, pointId });

//         } catch (error) {

//             if (error instanceof NotFoundException) {

//                 throw error;

//             };

//             throw new InternalServerErrorException(error);

//         };

//     };

// };