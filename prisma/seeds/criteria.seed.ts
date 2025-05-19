import { PrismaClient } from '@prisma/client';
import { criteriaData } from "../data/criteria.data";

const prisma = new PrismaClient();

async function seedCriteria() {
    console.log('▶️ Seeding criteria...');

    await prisma.criterion.createMany({
        data: criteriaData,
        skipDuplicates: true,
    });

    console.log('Criteria seeded successfully');
}

seedCriteria()
    .catch((e) => {
        console.error('Error seeding criteria:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });