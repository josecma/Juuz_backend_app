// import { ApiProperty, PartialType } from '@nestjs/swagger';
// import { $Enums, Company } from '@prisma/client';
// import { Type } from 'class-transformer';
// import {
//   IsEmail,
//   IsInt,
//   IsNotEmpty,
//   IsNumber,
//   IsOptional,
//   IsPhoneNumber,
//   IsString,
//   Length,
//   Matches,
//   MaxLength,
//   ValidateNested,
// } from 'class-validator';
// import { UpdateCarrierDto } from 'src/appCore/drivers/domain/driver.dtos';

// type CompanyWithoutId = Omit<
//   Company,
//   | 'id'
//   | 'createdAt'
//   | 'updatedAt'
//   | 'createdBy'
//   | 'updatedBy'
//   | 'deletedAt'
//   | 'deletedAt'
//   | 'deletedBy'
//   | 'version'
//   | 'ownerId'
//   | 'companyId'
//   | 'rating'
//   | 'infoUrl'
//   | 'stripeAccountId'
//   | 'status'
//   | 'companyType'
// >;
// export class CompanyDto implements CompanyWithoutId {
//   score: any;
//   @ApiProperty({
//     description: 'The name of the company',
//     example: 'Acme Corporation',
//     type: String,
//   })
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @ApiProperty({
//     description: 'Unique identifier for the carrier',
//     example: 'CARRIER123',
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   carrierIdentifier: string;

//   @ApiProperty({
//     description: 'USDOT number of the company',
//     example: '1234567',
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   @Matches(/^\d+$/, { message: 'USDOT must contain only numbers' })
//   @MaxLength(8)
//   usdot: string;

//   @ApiProperty({
//     description: 'Motor Carrier (MC) number of the company',
//     example: 'MC123456',
//     type: String,
//   })
//   @Length(8)
//   @IsString()
//   @IsOptional()
//   mc: string;

//   @ApiProperty({
//     description: 'Primary admin email address',
//     example: 'admin@acme.com',
//     type: String,
//   })
//   @IsEmail()
//   @IsOptional()
//   primaryAdminEmail: string;

//   @ApiProperty({
//     description: 'Country code for the phone number',
//     example: 'US',
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   @Length(2, 2)
//   countryCode: string;

//   @ApiProperty({
//     description: 'Phone number of the company',
//     example: '+1234567890',
//     type: String,
//   })
//   @IsPhoneNumber(null, { message: 'Invalid phone number format' })
//   @IsOptional()
//   phoneNumber: string;

//   @ApiProperty({
//     description: 'Phone number extension (if applicable)',
//     example: '123',
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   extension: string;

//   @ApiProperty({
//     description: 'Address line 1 of the company',
//     example: '123 Main St',
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   addressLine1: string;

//   @ApiProperty({
//     description: 'Address line 2 of the company (optional)',
//     example: 'Suite 400',
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   addressLine2: string;

//   @ApiProperty({
//     description: 'City where the company is located',
//     example: 'New York',
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   city: string;

//   @ApiProperty({
//     description: 'State where the company is located',
//     example: 'NY',
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   @Length(2, 2)
//   state: string;

//   @ApiProperty({
//     description: 'ZIP code of the company address',
//     example: '10001',
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   // @Matches(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format' })
//   zipCode: string;

//   @ApiProperty({
//     description: 'Country where the company is located',
//     example: 'United States',
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   country: string;

//   @ApiProperty({
//     description: 'The credit card number',
//     example: '4242424242424242',
//   })
//   @IsString()
//   @IsOptional({ message: 'Card number should not be empty' })
//   cardNumber: string;

//   @ApiProperty({
//     description: 'The expiration month of the card (1-12)',
//     example: '12',
//   })
//   @IsString()
//   @IsOptional({ message: 'Expiration month should not be empty' })
//   expMonth: string;

//   @ApiProperty({
//     description: 'The expiration year of the card (4 digits)',
//     example: '2025',
//   })
//   @IsString()
//   @IsOptional({ message: 'Expiration year should not be empty' })
//   expYear: string;

//   @ApiProperty({
//     example: '123456',
//     description:
//       'The unique DOT number validating the company is registered and authorized to operate.',
//   })
//   @IsString({ message: 'The DOT number must be a string.' })
//   @IsOptional({ message: 'The DOT number is required.' })
//   dotNumber: string;

//   @ApiProperty({
//     example: '987654321',
//     description: 'Phone.',
//   })
//   @IsString({ message: 'The phone must be a string.' })
//   @IsOptional({ message: 'The phone is required.' })
//   phone: string;

//   @ApiProperty({
//     example: '24/7',
//     description: 'Hours',
//   })
//   @IsString({ message: 'The hours must be a string.' })
//   @IsOptional({ message: 'The hours is required.' })
//   hours: string;

//   @ApiProperty({
//     example: 'insurance_details',
//     description: 'The photo of the insurance.',
//   })
//   @IsNumber()
//   @IsNotEmpty({ message: 'The insurance details are required.' })
//   insuranceDetailsId: string;

//   @ApiProperty({
//     example: 'insurance_details.pdf',
//     description:
//       "The details of the insurance covering the company's operation.",
//   })
//   @IsString({ message: 'The license type must be a string.' })
//   @IsNotEmpty({ message: 'The license type details are required.' })
//   licenseType: string;
// }

// export class UpdateCompanyDto extends PartialType(CompanyDto) {
//   @ApiProperty({
//     example: '[1,2,3]',
//     description: 'Data Ids',
//   })
//   @IsInt({ each: true })
//   @Type(() => String)
//   @IsOptional()
//   dataIds: string[];

//   @ApiProperty({ type: [UpdateCarrierDto] })
//   @ValidateNested({ each: true })
//   @Type(() => UpdateCarrierDto)
//   @IsOptional()
//   vehicles: UpdateCarrierDto[];
// }

// export class UpdateStatusCompanyDto {
//   @ApiProperty({
//     type: String,
//     description: 'The status the comunication.',
//     example: 'NON_VERIFIED',
//   })
//   @IsOptional()
//   status: string;
// }
