// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { $Enums, Company } from '@prisma/client';
// export class CompanyEntity implements Company {
//   score: any;
//   @ApiProperty({
//     example: 1,
//     description: 'The unique identifier of the company.',
//   })
//   id: string;

//   @ApiProperty({
//     description: 'Unique identifier for the carrier',
//     example: 'CARRIER123',
//     type: String,
//   })
//   carrierIdentifier: string;

//   @ApiProperty({
//     description: 'USDOT number of the company',
//     example: '1234567',
//     type: String,
//   })
//   usdot: string;

//   @ApiProperty({
//     description: 'Motor Carrier (MC) number of the company',
//     example: 'MC123456',
//     type: String,
//   })
//   mc: string;

//   @ApiProperty({
//     description: 'Primary admin email address',
//     example: 'admin@acme.com',
//     type: String,
//   })
//   primaryAdminEmail: string;

//   @ApiProperty({
//     description: 'Country code for the phone number',
//     example: 'US',
//     type: String,
//   })
//   countryCode: string;

//   @ApiProperty({
//     description: 'Phone number of the company',
//     example: '+1234567890',
//     type: String,
//   })
//   phoneNumber: string;

//   @ApiProperty({
//     description: 'Phone number extension (if applicable)',
//     example: '123',
//     type: String,
//   })
//   extension: string;

//   @ApiProperty({
//     description: 'Address line 1 of the company',
//     example: '123 Main St',
//     type: String,
//   })
//   addressLine1: string;

//   @ApiProperty({
//     description: 'Address line 2 of the company (optional)',
//     example: 'Suite 400',
//     type: String,
//   })
//   addressLine2: string;

//   @ApiProperty({
//     description: 'City where the company is located',
//     example: 'New York',
//     type: String,
//   })
//   city: string;

//   @ApiProperty({
//     description: 'State where the company is located',
//     example: 'NY',
//     type: String,
//   })
//   state: string;

//   @ApiProperty({
//     description: 'ZIP code of the company address',
//     example: '10001',
//     type: String,
//   })
//   zipCode: string;

//   @ApiProperty({
//     description: 'Country where the company is located',
//     example: 'United States',
//     type: String,
//   })
//   country: string;

//   @ApiProperty({
//     example: 1,
//     description: 'The unique identifier of the stripe account',
//   })
//   stripeAccountId: string;

//   @ApiProperty({
//     description: 'The status the comunication.',
//     example: 'NON_VERIFIED',
//   })
//   status: string;

//   // @ApiProperty({
//   //   enum: ['$Enums.CompanyType'],
//   //   description: 'The status the comunication.',
//   //   example: "",
//   // })
//   // companyType: "";

//   @ApiProperty({
//     description: 'The credit card number',
//     example: '4242424242424242',
//   })
//   cardNumber: string;

//   @ApiProperty({
//     description: 'The expiration month of the card (1-12)',
//     example: '12',
//   })
//   expMonth: string;

//   @ApiProperty({
//     description: 'The expiration year of the card (4 digits)',
//     example: '2025',
//   })
//   expYear: string;

//   @ApiProperty({
//     example: 1,
//     description: 'Company rating.',
//   })
//   rating: number;

//   @ApiProperty({
//     example: '987654321',
//     description:
//       'The unique DOT number validating the company is registered and authorized to operate.',
//   })
//   dotNumber: string;

//   @ApiProperty({
//     example: '987654321',
//     description: 'Phone.',
//   })
//   phone: string;

//   @ApiProperty({
//     example: '24/7',
//     description: 'Hours',
//   })
//   hours: string;

//   @ApiProperty({
//     example: 'Acme Inc.',
//     description: 'The official registered name of the company.',
//   })
//   name: string;

//   @ApiProperty({
//     type: [String],
//     description: 'Array de URLs de fotos en orden',
//   })
//   companyPhotos: string[];

//   @ApiProperty({
//     example: 'Pdf or Phote',
//     description: 'The info of the company.',
//   })
//   infoUrl: string;

//   @ApiProperty({
//     example: 'insurance_policy',
//     description:
//       "The details of the insurance covering the company's operation.",
//   })
//   insuranceDetailsId: string;

//   @ApiProperty({
//     example: 'Commercial',
//     description:
//       'The type of license under which the company operates. This can be "Commercial", "Private", etc.',
//   })
//   licenseType: string; // Assuming LicenseType is a string for this example

//   @ApiPropertyOptional({
//     type: Date,
//     description: 'The timestamp when the entity was created.',
//     example: '2023-04-05T14:48:00.000Z',
//   })
//   createdAt: Date;

//   @ApiPropertyOptional({
//     type: Date,
//     description: 'The timestamp when the entity was last updated.',
//     example: '2023-04-06T14:48:00.000Z',
//   })
//   updatedAt: Date;

//   @ApiPropertyOptional({
//     type: String,
//     description: 'Identifier of the user who created the entity.',
//     example: 'creatorUserId',
//   })
//   createdBy: string;

//   @ApiPropertyOptional({
//     type: String,
//     description: 'Identifier of the user who last updated the entity.',
//     example: 'updaterUserId',
//   })
//   updatedBy: string;

//   @ApiPropertyOptional({
//     type: Date,
//     description:
//       'The timestamp when the entity was deleted. Null if not deleted.',
//     example: '2023-04-07T14:48:00.000Z',
//   })
//   deletedAt: Date;

//   @ApiPropertyOptional({
//     type: String,
//     description: 'Identifier of the user who deleted the entity.',
//     example: 'deleterUserId',
//   })
//   deletedBy: string;

//   @ApiProperty({
//     type: Number,
//     description:
//       'Version number of the entity for optimistic concurrency control.',
//     example: 1,
//   })
//   version: number;

//   @ApiPropertyOptional({
//     type: Number,
//     description: 'Identifier of the owner of the entity.',
//     example: 2,
//   })
//   ownerId: string;

//   @ApiPropertyOptional({
//     type: Number,
//     description: 'Identifier of the company associated with the entity.',
//     example: 3,
//   })
//   companyId: string;
// }
