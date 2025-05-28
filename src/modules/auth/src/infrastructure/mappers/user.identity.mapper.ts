// import { Prisma } from "@prisma/client";
// import UserIdentity from "../../domain/entities/identity";

// export default class UserIdentityMapper {
//     static to(
//         orm: Prisma.UserIdentityGetPayload<{}>
//     ) {
//         const {
//             id,
//             type,
//             value,
//             verified,
//             metadata,
//         } = orm;

//         return new UserIdentity(
//             {
//                 id,
//                 type,
//                 value,
//                 verified,
//                 metadata: metadata as Record<string, unknown>,
//             }
//         );
//     };
// };