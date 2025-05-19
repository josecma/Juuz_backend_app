import { Prisma } from '@prisma/client';

export const driverNegotion: Prisma.UserDefaultArgs = {
  select: {
    userCompanyRoles: {
      select: {
        company: {
          select: {
            id: true,
            rating: true,
            companyName: true,
          },
        },
      },
    },
    driver: {
      select: {
        vehicleInfo: {
          select: {
            model: {
              select: {
                name: true,
                version: true,
                brand: {
                  select: {
                    name: true,
                    version: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
