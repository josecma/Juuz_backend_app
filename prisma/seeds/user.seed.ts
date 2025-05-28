// import { PrismaClient } from '@prisma/client';
// import { userData } from '../data/user.data';
// import * as bcrypt from "bcrypt";


// const prisma = new PrismaClient();
// const saltRounds = 10;

// async function main() {

//     for (const user of userData) {
//         const hashedPassword = await bcrypt.hash(user.password, saltRounds);

//         await prisma.user.create({
//             data: {
//                 ...user,
//                 password: hashedPassword
//             }
//         });
//     }
//     console.log('Seed completado: 10 usuarios creados');
// }

// main()
//     .catch(e => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });