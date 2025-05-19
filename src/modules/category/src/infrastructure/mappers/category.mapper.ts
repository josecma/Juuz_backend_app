// import { Prisma } from "@prisma/client";
// import Category from "../../domain/entities/category";
// import Tree from "src/modules/shared/src/domain/entities/tree";

// export default class CategoryMapper {
//     static to(
//         params: {
//             orm: Prisma.CategoryGetPayload<{
//                 include: {
//                     categories: true,
//                 }
//             }>
//         }
//     ): Category {

//         const { orm } = params;
//         const { id, name, categories } = orm;

//         return new Tree<Category>(
//             {
//                 root: new Category(
//                     {
//                         id,
//                         name
//                     }
//                 ),
//                 subTrees: categories.map(
//                     (e) => CategoryMapper.to(
//                         {
//                             orm: e
//                         }
//                     )
//                 )

//             }
//         );

//     };

// };