import { $Enums, PrismaClient, ServiceEnum } from '@prisma/client';
const fs = require('fs');
const csv = require('csv-parser');
import * as csvParser from 'csv-parser';
const prisma = new PrismaClient();

// const roles: Record<string, [string, string][]> = {
//   SHIPPER: [
//     ['/messages', 'GET'],
//     ['/messages/unread', 'GET'],
//     ['/messages/:id', 'GET'],
//     ['/messages/unread/:id', 'PATCH'],
//     ['/user_shippers', 'GET'],
//     ['/healths', 'GET'],
//     ['/user_shippers', 'PATCH'],
//     ['/user_shippers', 'DELETE'],
//     ['/otp/shipper', 'POST'],
//     ['/otp/carrier', 'POST'],
//     ['/orders_shippers', 'POST'],
//     ['/orders_shippers/apk', 'POST'],
//     ['/orders_shippers', 'GET'],
//     ['/orders_shippers/applyings', 'GET'],
//     ['/orders_shippers/:id', 'GET'],
//     ['/orders_shippers/point/:id', 'PATCH'],
//     ['/orders_shippers/accept/:id', 'PATCH'],
//     ['/orders_shippers/canceled/:id', 'PATCH'],
//     ['/orders_shippers/:id', 'PATCH'],
//     ['/negotiations_shipper/shiepersApplyings/:id', 'GET'],
//     ['/negotiations_shipper/carriersApplying', 'GET'],
//     ['/negotiations_shipper/driversApplyings/:id', 'GET'],
//     ['/negotiations_shipper/:id', 'GET'],
//     ['/shipper_performances', 'POST'],
//     ['/shipper_performances', 'GET'],
//     ['/shipper_performances/averages', 'GET'],
//     ['/shipper_performances/:id', 'GET'],
//     ['/profile', 'GET'],
//     ['/shipper_performances/:id', 'PATCH'],
//     ['/shipper_performances/:id', 'DELETE'],
//     ['/ably/token', 'POST'],
//     ['/verify', 'POST'],
//     ['/brands/:id', 'GET'],
//     ['/brands', 'GET'],
//     ['/brands/all', 'GET'],
//     ['/validation/vin-validation/:vinNumber', 'GET'],
//     ['/payments', 'POST'],
//     ['/negotiations/:id', 'PATCH'],
//     ['/switch', 'GET'],
//     ['/services', 'GET'],
//   ],
//   COMPANY: [
//     ['/point_drivers/nearby_order', 'GET'],
//     ['/messages', 'GET'],
//     ['/messages/:id', 'GET'],
//     ['/messages/unread/:id', 'PATCH'],
//     ['/messages/unread', 'GET'],
//     ['/users', 'GET'],
//     ['/user_shippers', 'GET'],
//     ['/user_shippers', 'PATCH'],
//     ['/user_shippers', 'DELETE'],
//     ['/otp/shipper', 'POST'],
//     ['/orders_shippers', 'POST'],
//     ['/orders_shippers/apk', 'POST'],
//     ['/orders_shippers', 'GET'],
//     ['/orders_shippers/applyings', 'GET'],
//     ['/orders_shippers/:id', 'GET'],
//     ['/orders_shippers/point/:id', 'PATCH'],
//     ['/orders_shippers/accept/:id', 'PATCH'],
//     ['/orders_shippers/canceled/:id', 'PATCH'],
//     ['/orders_carriers/apk/finished/:id', 'PATCH'],
//     ['/orders_shippers/:id', 'PATCH'],
//     ['/negotiations_shipper/shiepersApplyings/:id', 'GET'],
//     ['/negotiations_shipper/carriersApplying', 'GET'],
//     ['/negotiations_shipper/driversApplyings/:id', 'GET'],
//     ['/negotiations_shipper/:id', 'GET'],
//     ['/shipper_performances', 'POST'],
//     ['/shipper_performances', 'GET'],
//     ['/shipper_performances/averages', 'GET'],
//     ['/shipper_performances/:id', 'GET'],
//     ['/shipper_performances/:id', 'PATCH'],
//     ['/shipper_performances/:id', 'DELETE'],
//     ['/user_carriers', 'GET'],
//     ['/user_carriers', 'PATCH'],
//     ['/user_carriers', 'DELETE'],
//     ['/otp/carrier', 'POST'],
//     ['/orders_carriers/applyings', 'GET'],
//     ['/orders_carriers/assigned_orders', 'GET'],
//     ['/orders_carriers/noApplyings', 'GET'],
//     ['/drivers/carrier', 'POST'],
//     ['/negotiations_carrier/driversApplying', 'GET'],
//     ['/negotiations_carrier/driversApplyings/:id', 'GET'],
//     ['/carrier_performances', 'POST'],
//     ['/carrier_performances', 'GET'],
//     ['/carrier_performances/averages', 'GET'],
//     ['/carrier_performances/:id', 'GET'],
//     ['/carrier_performances/:id', 'PATCH'],
//     ['/carrier_performances/:id', 'DELETE'],
//     ['/ably/token', 'POST'],
//     ['/ably', 'POST'],
//     ['/users', 'POST'],
//     ['/users', 'GET'],
//     ['/users/:id', 'GET'],
//     ['/users/:id', 'PATCH'],
//     ['/users/:id', 'DELETE'],
//     ['/verify', 'POST'],
//     ['/profile', 'GET'],
//     ['/companies', 'GET'],
//     ['/switch', 'GET'],
//     ['/sessions', 'POST'],
//     ['/sessions', 'GET'],
//     ['/sessions/:id', 'GET'],
//     ['/sessions/:id', 'PATCH'],
//     ['/sessions/:id', 'DELETE'],
//     ['/companies', 'POST'],
//     ['/companies/:id', 'GET'],
//     ['/companies/:id', 'PATCH'],
//     ['/companies/:id', 'DELETE'],
//     ['/companyDrivers', 'PATCH'],
//     ['/permissions', 'POST'],
//     ['/permissions', 'GET'],
//     ['/permissions/:id', 'GET'],
//     ['/permissions/:id', 'PATCH'],
//     ['/permissions/:id', 'DELETE'],
//     ['/informations', 'POST'],
//     ['/informations', 'GET'],
//     ['/informations/:id', 'GET'],
//     ['/informations/:id', 'PATCH'],
//     ['/informations/:id', 'DELETE'],
//     ['/points', 'POST'],
//     ['/points', 'GET'],
//     ['/points/:id', 'GET'],
//     ['/points/:id', 'PATCH'],
//     ['/point_drivers', 'PATCH'],
//     ['/orders', 'POST'],
//     ['/orders', 'GET'],
//     ['/orders/:id', 'GET'],
//     ['/orders/:id', 'PATCH'],
//     ['/orders/:id', 'DELETE'],
//     ['/drivers', 'POST'],
//     ['/drivers', 'GET'],
//     ['/drivers/:id', 'GET'],
//     ['/drivers/:id', 'PATCH'],
//     ['/drivers/:id', 'DELETE'],
//     ['/vehicle_infos', 'POST'],
//     ['/vehicle_infos', 'GET'],
//     ['/vehicle_infos/:id', 'GET'],
//     ['/vehicle_infos/:id', 'PATCH'],
//     ['/vehicle_infos/:id', 'DELETE'],
//     ['/negotiations', 'POST'],
//     ['/negotiations', 'GET'],
//     ['/negotiations/:id', 'GET'],
//     ['/negotiations/:id', 'PATCH'],
//     ['/services', 'POST'],
//     ['/services', 'GET'],
//     ['/services:id', 'GET'],
//     ['/services:id', 'PATCH'],
//     ['/services:id', 'DELETE'],
//     ['/subServices', 'POST'],
//     ['/subServices', 'GET'],
//     ['/subServices/:id', 'GET'],
//     ['/subServices/:id', 'PATCH'],
//     ['/subServices/:id', 'DELETE'],
//     ['/roles', 'POST'],
//     ['/roles', 'GET'],
//     ['/roles/:id', 'GET'],
//     ['/roles/:id', 'PATCH'],
//     ['/roles/:id', 'DELETE'],
//     ['/comunications', 'GET'],
//     ['/comunications/:id', 'GET'],
//     ['/comunications/:id', 'PATCH'],
//     ['/comunications/:id', 'DELETE'],
//     ['/comunications/rider-comunication', 'GET'],
//     ['/comunications/driver-comunication', 'GET'],
//     ['/healths/db', 'GET'],
//     ['/healths/url', 'GET'],
//     ['/healths', 'GET'],
//     ['/validation/vin-validation/:vinNumber', 'GET'],
//     ['/loaderBoards', 'POST'],
//     ['/loaderBoards', 'GET'],
//     ['/loaderBoards', 'DELETE'],
//     ['/brands/:id', 'GET'],
//     ['/brands', 'GET'],
//     ['/brands/all', 'GET'],
//     ['/s3upload', 'POST'],
//     ['/trips', 'POST'],
//     ['/trips/tripsAttention', 'GET'],
//     ['/trips', 'GET'],
//     ['/trips/:id', 'GET'],
//     ['/trips/:id', 'PATCH'],
//     ['/trips/:id', 'DELETE'],
//     ['/payments', 'POST'],
//     ['/orders/referred/:id', 'PATCH'],
//     ['/services', 'GET'],
//     // ['/payments', 'GET'],
//     // ['/payments:id', 'GET'],
//     // ['/payments:id', 'PATCH'],
//     // ['/payments:id', 'DELETE'],
//   ],
// };

// async function addPermissionsToRoles() {
//   for (const [roleName, permissions] of Object.entries(roles)) {
//     // Buscar el rol en la base de datos
//     const role = await prisma.role.findUnique({
//       where: { name: roleName },
//     });

//     if (!role) {
//       // console.log(`Role ${roleName} not found`);
//       continue;
//     }

//     // Obtener los permisos existentes del rol
//     const existingPermissions = await prisma.permission.findMany({
//       where: {
//         role: {
//           some: {
//             id: role.id,
//           },
//         },
//       },
//       select: {
//         name: true,
//         action: true,
//       },
//     });

//     const existingPermissionsSet = new Set(
//       existingPermissions.map((p) => `${p.name}_${p.action}`)
//     );

//     // Añadir nuevos permisos si no existen
//     for (const [path, method] of permissions) {
//       const permissionKey = `${path}_${method}`;
//       if (!existingPermissionsSet.has(permissionKey)) {
//         // Crear el nuevo permiso
//         const newPermission = await prisma.permission.findUnique({
//           where: {
//             action_name: {
//               name: path,
//               action: method,
//             },
//           },
//         });

//         // Asociar el nuevo permiso con el rol
//         await prisma.role.update({
//           where: { id: role.id },
//           data: {
//             permission: {
//               connect: { id: newPermission.id },
//             },
//           },
//         });

//         // console.log(
//         //   `Added permission ${newPermission.name} to role ${roleName}`
//         // );
//       } else {
//         // console.log(
//         //   `Permission ${path} with action ${method} already exists for role ${roleName}`
//         // );
//       }
//     }
//   }
// }

// // Function to upsert roles and permissions
// async function upsertRolesAndPermissions() {
//   for (const [roleName, permissions] of Object.entries(roles)) {
//     // Ensure roleName is of type RolesEnum
//     const roleType =
//       roleName === 'SHIPPER' ? RolesEnum.SHIPPER : RolesEnum.COMPANY;

//     // If the role exists, update its permissions
//     for (const [name, action] of permissions as [string, string][]) {
//       const sd = await prisma.permission.upsert({
//         where: {
//           action_name: {
//             action,
//             name,
//           },
//         },
//         update: {
//           role: {
//             connect: { name: roleType },
//           },
//         },
//         create: {
//           action,
//           name,
//           description: `${action} permission for ${roleType}`,
//           role: {
//             connect: { name: roleType },
//           },
//         },
//       });
//       if (action === '/orders/referred/:id') console.log(sd);
//     }
//     // console.log(`Updated permissions for role: ${role.name}`);
//   }
// }

async function myUpper() {
    const brands = await prisma.brand.findMany();

    // Recorrer cada marca y actualizar el nombre a mayúsculas
    for (const brand of brands) {
        await prisma.brand.update({
            where: { id: brand.id }, // Identificar el registro por su ID
            data: { name: brand.name.toUpperCase() }, // Transformar el nombre a mayúsculas
        });
    }

    const modles = await prisma.model.findMany();

    // Recorrer cada marca y actualizar el nombre a mayúsculas
    for (const model of modles) {
        await prisma.model.update({
            where: { id: model.id }, // Identificar el registro por su ID
            data: { name: model.name.toUpperCase() }, // Transformar el nombre a mayúsculas
        });
    }
}

// async function createData() {
//     // //   // Upsert para la tabla Brand
//     const brand = await prisma.brand.upsert({
//         where: { name: 'Toyota' }, // Clave única
//         update: {}, // Si ya existe, no actualizamos nada
//         create: {
//             name: 'Toyota',
//             createdBy: 'seed-script',
//         },
//     }); // Upsert para la tabla Model

//     // const model = await prisma.model.upsert({
//     //     where: { name_brandId: { name: 'Corolla', brandId: brand.id } }, // Clave única compuesta
//     //     update: {}, // Si ya existe, no actualizamos nada
//     //     create: {
//     //         name: 'Corolla',
//     //         brandId: brand.id, // ID de la marca Toyota
//     //         createdBy: 'seed-script',
//     //     },
//     // }); // Upsert para la tabla Company

// //   const company = await prisma.company.upsert({
// //     where: { companyName: 'Example Company' }, // Clave única
// //     update: {
// //       rating: 5, // Actualizamos el rating si ya existe
// //     },
// //     create: {
// //       companyName: 'Example Company',
// //       rating: 5,
// //       phone: '123-456-7890',
// //       cardNumber: '4111111111111111',
// //       expMonth: '12',
// //       expYear: '2030',
// //       createdBy: 'seed-script',
// //     },
// //   }); // Upsert para la tabla User

// //   const user = await prisma.user.upsert({
// //     where: { email: 'user@example.com' }, // Clave única
// //     update: {
// //       firstName: 'Updated Name', // Actualizamos el nombre si ya existe
// //     },
// //     create: {
// //       email: 'user@example.com',
// //       firstName: 'John',
// //       lastName: 'Doe',
// //       phone: '987-654-3210',
// //       createdBy: 'seed-script',
// //     },
// //   }); // Upsert para la tabla Role

// //   const role = await prisma.role.upsert({
// //     where: { name: 'Admin' }, // Clave única
// //     update: {}, // Si ya existe, no actualizamos nada
// //     create: {
// //       name: 'Admin',
// //       description: 'Administrator role',
// //       type: 'SHIPPER', // Valor válido de RolesEnum
// //       createdBy: 'seed-script',
// //     },
// //   }); // Upsert para la tabla PaymentMethod

// //   const paymentMethod = await prisma.paymentMethod.upsert({
// //     where: { name_companyId: { name: 'Credit Card', companyId: company.id } }, // Clave única compuesta
// //     update: {
// //       discountPercentage: 5.0, // Actualizamos el descuento si ya existe
// //     },
// //     create: {
// //       name: 'Credit Card',
// //       type: 'CARD',
// //       date: new Date(),
// //       discountPercentage: 5.0,
// //       companyId: company.id, // ID de la compañía creada anteriormente
// //       createdBy: 'seed-script',
// //     },
// //   }); // Upsert para la tabla Payment

// //   const payment = await prisma.payment.upsert({
// //     where: { orderId: 1 }, // Clave única
// //     update: {
// //       amount: 200.0, // Actualizamos el monto si ya existe
// //     },
// //     create: {
// //       amount: 200.0,
// //       finalAmount: 190.0,
// //       status: 'PENDING',
// //       paymentDate: new Date(),
// //       depositDate: new Date(),
// //       paymentMethodId: paymentMethod.id, // ID del método de pago creado anteriormente
// //       companyId: company.id, // ID de la compañía creada anteriormente
// //       createdBy: 'seed-script',
// //     },
// //   }); // Upsert para la tabla Order

// //   const order = await prisma.order.upsert({
// //     where: { id: 1 }, // Clave única
// //     update: {
// //       price: 500, // Actualizamos el precio si ya existe
// //     },
// //     create: {
// //       user: { connect: { id: user.id } }, // Conecta el usuario por su ID
// //       // service: { connect: { id: 1 } }, // Conecta el servicio por su ID
// //       expirationTime: new Date(),
// //       pickUpDate: '2024-12-10',
// //       deliveryDate: '2024-12-15',
// //       price: 500,
// //       milles: 100,
// //       status: 'PENDING',
// //       subStatus: 'UPCOMING',
// //       createdBy: 'seed-script',
// //     },
// //   }); // Upsert para la tabla UserCompanyRole (relación entre User, Company y Role)

// //   await prisma.userCompanyRole.upsert({
// //     where: { userId_companyId: { userId: user.id, companyId: company.id } }, // Clave única compuesta
// //     update: {}, // Si ya existe, no actualizamos nada
// //     create: {
// //       userId: user.id,
// //       companyId: company.id,
// //       roleId: role.id,
// //       createdBy: 'seed-script',
// //     },
// //   });
// }

// // Usage
// // Assuming you have a Prisma client instance

async function importCsvModel(filePath: string): Promise<void> {
    const vehicles = [];

    // Leer el archivo CSV
    fs.createReadStream(filePath)
        .pipe(csvParser({ separator: ';' })) // Especificamos el separador como ';'
        .on('data', async (row) => {
            const { Name, MakeId } = row;
            vehicles.push({ name: Name, makeId: MakeId }); // Convertir MakeId a número
        })
        .on('end', async () => {
            // Filtrar vehículos únicos por Name y MakeId antes de insertarlos
            const uniqueVehicles = Array.from(
                new Set(vehicles.map((v) => `${v.name}-${v.makeId}`))
            ).map((v) =>
                vehicles.find((vehicle) => `${vehicle.name}-${vehicle.makeId}` === v)
            );

            for (const vehicle of uniqueVehicles) {
                if (vehicle.makeId) {
                    const exists = await prisma.model.findFirst({
                        where: {
                            name: vehicle.name,
                            brandId: vehicle.makeId,
                        },
                    });

                    if (!exists) {
                        // console.log(vehicle);
                        await prisma.model.create({
                            data: {
                                name: vehicle.name,
                                brand: {
                                    connect: {
                                        id: vehicle.makeId,
                                    },
                                },
                            },
                        });
                    }
                }
            }
        });
}

async function importCsvBrand(filePath: string): Promise<void> {
    const brands: { id: number; name: string }[] = [];

    // Leer el archivo CSV
    fs.createReadStream(filePath) // Cambia esta ruta al archivo CSV
        .pipe(csv({ separator: ';', mapHeaders: ({ header }) => header.trim() }))
        .on('data', async (row) => {
            const { Id, Name } = row;
            // console.log(Id, Name);
            const brandId = Id;
            // if(brandId=== 99) return
            // Inserta los datos en la tabla Brand
            await prisma.brand.upsert({
                where: { id: brandId },
                update: { name: Name.toUpperCase() },
                create: { id: brandId, name: Name.toUpperCase() },
            });
        });
}

// async function populateModels(brandsMap: Map<number, any>) {
//     fs.createReadStream('prisma/data/model.csv')
//         .pipe(csv({ separator: ';', mapHeaders: ({ header }) => header.trim() }))
//         .on('data', async (row) => {
//             const { Id, Name, MakeId, OriginalId } = row;
//             const modelId = parseInt(Id);
//             const brandId = parseInt(MakeId);
//             // console.log(row);

//             // Encuentra el Brand correspondiente
//             // const brand = brandsMap.get(brandId);
//             // console.log(brandsMap);
//             // console.log(brand);
//             // console.log(brandId);

//             if (true) {
//                 // Inserta los datos en la tabla Model
//                 await prisma.model.upsert({
//                     data: {
//                         name: Name,
//                         brandId: brandId, // Relacionar el modelo con la marca
//                     },
//                 });
//             } else {
//                 console.warn(`Brand with id ${brandId} not found for model ${Name}`);
//             }
//         })
//         .on('end', () => {
//             console.log('Models CSV successfully processed.');
//         });
// }

async function updateYear() {
    const results: Array<{
        Marca: string;
        Modelo: string;
        AñoModelo: string;
    }> = [];

    fs.createReadStream(
        'prisma/data/_SELECT_mk_Name_AS_Marca_md_Name_AS_Modelo_vsY_Year_AS_AñoModelo_202502010950.csv'
    )
        .pipe(csvParser())
        .on('data', (data) => {
            results.push({
                Marca: data.Marca,
                Modelo: data.Modelo,
                AñoModelo: data.AñoModelo,
            });
        })
        .on('end', async () => {
            const maxId = await prisma.brand.aggregate({
                _max: {
                    id: true,
                },
            });
            // Ahora que ya leímos todo el CSV, hacemos el upsert
            for (const row of results) {
                // Preparamos datos
                const brandName = row.Marca.trim(); // "Acura"
                const modelName = row.Modelo.trim(); // "CL"
                const modelYear = parseInt(row.AñoModelo, 10) || null;

                // 1) Upsert de la Brand
                //    Usa la columna "name" en Brand (que es @unique)
                const brand = await prisma.brand.upsert({
                    where: { name: brandName.toUpperCase() },
                    update: { name: brandName.toUpperCase() }, // No actualizamos nada en "Brand" por ahora
                    create: {
                        name: brandName.toUpperCase(),
                        id: maxId._max.id + 1,
                        // Si quieres setear más campos, agrégalos aquí
                    },
                });

                if (brand.id === maxId._max.id + 1) maxId._max.id += 1;

                const sd = await prisma.model.findUnique({
                    where: {
                        name_brandId_year: {
                            name: modelName,
                            brandId: brand.id,
                            year: modelYear,
                        },
                    },
                });

                if (!sd) {
                    console.log(modelName, brand.id, modelYear);
                }

                await prisma.model.upsert({
                    where: {
                        name_brandId_year: {
                            name: modelName,
                            brandId: brand.id,
                            year: modelYear,
                        },
                    },
                    update: {
                        year: modelYear,
                    },
                    create: {
                        name: modelName,
                        year: modelYear,
                        brand: {
                            connect: { id: brand.id },
                        },
                    },
                });
            }

            console.log('Upsert completado con éxito');
            await prisma.$disconnect();
        });
}

async function main() {
    // const brandsMap = new Map<number, any>();
    // await myUpper();
    // await addPermissionsToRoles();
    // await upsertRolesAndPermissions();
    await importCsvBrand('prisma/data/make.csv');
    await importCsvModel('prisma/data/model.csv');
    await updateYear();
    // await prisma.service.create({
    //   data: { name: ServiceEnum.OTHERS, ownerId: 1 },
    // });
    // fs.createReadStream('prisma/data/make.csv')
    // const appContext = await NestFactory.createApplicationContext(AppModule);
    // const ablyService = appContext.get(AblyService);
}

// // const role = await prisma.role.create({
// //     data: {
// //       name: $Enums.RolesEnum.COMPANY,
// //       version: 1,
// //       description: 'Sytem',
// //       ownerId: 1,
// //       permission: {},
// //     },
// //   });
// //   const newCompany = await prisma.company.create({
// //     data: {
// //       dotNumber: '112314115617',
// //       phone: "string",
// //       hours: "string",
// //       companyName: 'Ejemplo C1o1wmp1asny S.A.',
// //       insuranceDetails: 'Detalles de Seguro XYZ',
// //       licenseType: 'TipoLicenciaX',
// //       createdBy: 'admin',
// //       updatedBy: 'admin',
// //       ownerId: 1,
// //       roles: {
// //         connect: { id: role.id },
// //       },
// //     },
// //   });

// //   const newUser = await prisma.user.create({
// //     data: {
// //       email: 'usuariwo@1e1jempelo.com',
// //       phone: '12345w671218910',
// //       firstName: 'Juan',
// //       lastName: 'Pérez',
// //       isActive: true,
// //       createdBy: 'admin',
// //       updatedBy: 'admin',
// //       companies: {
// //         connect: [{ id: newCompany.id }],
// //       },
// //     },
// //   });

// //   const newUser1 = await prisma.user.create({
// //     data: {
// //       email: 'usuarwi1o21@ejempdlo.com',
// //       phone: '1234567w128192302',
// //       firstName: 'Juan',
// //       lastName: 'Pérez',
// //       isActive: true,
// //       createdBy: 'admin',
// //       updatedBy: 'admin',
// //       companies: {
// //         connect: [{ id: newCompany.id }],
// //       },
// //     },
// //   });

// //   const ablyChannel = await prisma.ablyChannel.create({
// //     data: {
// //       name: 's1wd',
// //       user: {
// //         connect: { id: newUser.id },
// //       },
// //       ownerId: 1,
// //       ablyUserId: '' + newUser.id,
// //     },
// //   });

// //   const ablyChannel1 = await prisma.ablyChannel.create({
// //     data: {
// //       name: 's1w2d1',
// //       user: {
// //         connect: { id: newUser1.id },
// //       },
// //       ownerId: 1,
// //       ablyUserId: '' + newUser1.id,
// //     },
// //   });

// //   const vehicleInfo = await prisma.vehicleInfo.create({
// //     data: {
// //       createdBy: 'system',
// //       updatedBy: 'system',
// //       ownerId: 1,
// //       companyId: 1,
// //       model: { connect: { id: 1 } },
// //     },
// //   });

// //   const vehicleInfo1 = await prisma.vehicleInfo.create({
// //     data: {
// //       createdBy: 'system',
// //       updatedBy: 'system',
// //       ownerId: 1,
// //       companyId: 1,
// //       model: { connect: { id: 1 } },
// //     },
// //   });

//   const service = await prisma.service.create({
//     data: {
//       name: $Enums.ServiceEnum.OTHERS,
//       createdBy: 'system',
//       updatedBy: 'system',
//       ownerId: 1,
//       subService: {
//         create: [
//           {
//             name: $Enums.SubServiceEnum.AIR,
//             createdBy: 'system',
//             updatedBy: 'system',
//             ownerId: 1,
//           },
//         ],
//       },
//     },
//   });

//   const subService1 = await prisma.subService.create({
//     data: {
//       name: $Enums.SubServiceEnum.IRON,
//       createdBy: 'system',
//       updatedBy: 'system',
//       ownerId: 1,
//     },
//   });

// //   const driver = await prisma.driver.create({
// //     data: {
// //       userId: newUser.id,
// //       vinNumber: '1HGBH41JXMN109186',
// //       vehicleType: 'Truck',
// //       vehiclePhoto: 'https://example.com/photo.jpg',
// //       insuranceDoc: 'DOC1234567',
// //       faceId: 'FACE1234567',
// //       capacity: 3,
// //       vehicleInfoId: vehicleInfo.id,
// //       createdBy: 'system',
// //       updatedBy: 'system',
// //       ownerId: newUser.id,
// //       serviceId: service.id,
// //     },
// //   });

// //   const driver1 = await prisma.driver.create({
// //     data: {
// //       userId: newUser1.id,
// //       vinNumber: '1HGBH41JXMN129186',
// //       vehicleType: 'Truck',
// //       vehiclePhoto: 'https://examp1le.com/photo.jpg',
// //       insuranceDoc: 'DOC1234567',
// //       faceId: 'FACE1234567',
// //       capacity: 3,
// //       vehicleInfoId: vehicleInfo1.id,
// //       createdBy: 'system',
// //       updatedBy: 'system',
// //       ownerId: newUser1.id,
// //       serviceId: service.id,
// //     },
// //   });

// //   try {
// //     const query = `
// //     INSERT INTO "MiniPoint" ("coords",
// //     "created_at", "updated_at", "created_by", "updated_by", "deleted_at", "deleted_by")
// //     VALUES (ST_SetSRID(ST_MakePoint($1, $2), 4326), NOW(), NOW(), $3, $4, $5, $6);
// //   `;
// //     await prisma.$executeRawUnsafe(query, 1, 1, '1', null, null, null);

// //     const query1 = `
// //     INSERT INTO "Point" (
// //       "coords", "orderId", "driverId", "created_at", "updated_at",
// //       "created_by", "updated_by", "deleted_at", "deleted_by", "version", "owner_id", "company_id"
// //     )
// //     VALUES (
// //       ST_SetSRID(ST_MakePoint($1, $2), 4326),
// //       $3,
// //       $4,
// //       NOW(),
// //       NOW(),
// //       $5,
// //       $6,
// //       $7,
// //       $8,
// //       $9,
// //       $10,
// //       $11
// //     );
// //     `;
// //     await prisma.$executeRawUnsafe(
// //       query1,
// //       // coords
// //       1, //$1
// //       1, //$2
// //       // orderId
// //       null, //$3
// //       // driverId
// //       1, //$4
// //       // created_by, updated_by
// //       '1', //$5
// //       null, //%6
// //       // deleted_at, deleted_by
// //       null,
// //       null,
// //       // version
// //       0,
// //       // owner_id
// //       1,
// //       // company_id
// //       null,
// //     );
// //     const sd = 12;
// //   } catch (e) {
// //     const sds = 0;
// //   }
// //   const sd = 12;

// //   // const info = await prisma.information.create({
// //   //   data: {
// //   //     description: 'Detailed information about logistics requirements.',
// //   //     createdBy: 'system',
// //   //     updatedBy: 'system',
// //   //     ownerId: 1,
// //   //     point: {
// //   //       connect: { id: 1 },
// //   //     },
// //   //     order: {},
// //   //   },
// //   // });

// //   // const info1 = await prisma.information.create({
// //   //   data: {
// //   //     description: 'Detailed information about logistics requirements.',
// //   //     createdBy: 'system',
// //   //     updatedBy: 'system',
// //   //     ownerId: 1,
// //   //     point: {
// //   //       connect: { id: 1 },
// //   //     },
// //   //     order: {},
// //   //   },
// //   // });
// //   // }
// // }

// // // execute the main function

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });
