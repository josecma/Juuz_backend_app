import { PrismaClient } from '@prisma/client';
import companyMemberRoleData from '../data/company.member.role.data';

const prisma = new PrismaClient();

async function seedCompanyRoles() {
    console.log('▶️ Seeding company roles...');

    await prisma.companyMemberRole.createMany({
        data: companyMemberRoleData,
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