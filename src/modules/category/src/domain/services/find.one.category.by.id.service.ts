// import { Inject, Injectable } from "@nestjs/common";
// import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
// import CategoryRepository from "../../infrastructure/repositories/category.repository";
// import Category from "../entities/category";

// @Injectable({})
// export default class FindOneCategoryByIdService {

//     public constructor(
//         @Inject(CategoryRepository)
//         private readonly categoryRepository: CategoryRepository,
//     ) { };

//     public async find(
//         params: {
//             id: string;
//         }
//     ): Promise<Category> {

//         const { id } = params;

//         try {

//             if (!id) {
//                 throw new BadRequestDomainException(
//                     {
//                         source: FindOneCategoryByIdService.name,
//                         message: "id is required"
//                     }
//                 );
//             };

//             const res = await this.categoryRepository.find({

//             });

//         } catch (error) {
//             throw error;
//         };

//     };

// };