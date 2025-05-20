import { PrismaClient } from '@prisma/client';
import companyRoleData from '../data/company.role.data';

const prisma = new PrismaClient();

async function seedCompanyRoles() {
    console.log('▶️ Seeding company roles...');

    await prisma.userCompanyRole.createMany({
        data: companyRoleData,
        skipDuplicates: true,
    });

    console.log('company roles seeded successfully');
}

seedCompanyRoles()
    .catch((e) => {
        console.error('Error seeding company roles:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });