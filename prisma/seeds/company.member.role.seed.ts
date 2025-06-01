import { PrismaClient } from '@prisma/client';
import companyMemberRoleData from '../data/company.member.role.data';

const prisma = new PrismaClient();

async function seedCompanyMemberRoles() {
    console.log('▶️ Seeding company member roles...');

    await prisma.companyMemberRole.createMany({
        data: companyMemberRoleData,
        skipDuplicates: true,
    });

    console.log('company roles seeded successfully');
}

seedCompanyMemberRoles()
    .catch((e) => {
        console.error('Error seeding company member roles:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });