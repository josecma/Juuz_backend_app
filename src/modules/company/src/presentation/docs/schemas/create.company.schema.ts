import { ApiProperty } from "@nestjs/swagger";

export default class CreateCompanySchema {

    @ApiProperty({
        description: 'the name of the company',
        example: 'Acme Corporation',
        type: String,
        required: true,
    })
    name: string;

    @ApiProperty({
        description: 'unique identifier for the carrier',
        example: 'CARRIER123',
        type: String,
        required: false,
    })
    carrierIdentifier: string;

    @ApiProperty({
        description: 'usdot number of the company',
        example: '1234567',
        type: String,
        required: true,
    })
    usdot: string;

    @ApiProperty({
        description: 'Motor Carrier (MC) number of the company',
        example: 'MC123456',
        type: String,
        required: true,
    })
    mc: string;

    @ApiProperty({
        description: 'Primary admin email address',
        example: 'admin@acme.com',
        type: String,
        required: false,
    })
    primaryAdminEmail: string;

    @ApiProperty({
        description: 'Country code for the phone number',
        example: 'US',
        type: String,
        required: false,
    })
    countryCode: string;

    @ApiProperty({
        description: 'Phone number of the company',
        example: '+1234567890',
        type: String,
        required: false,
    })
    phoneNumber: string;

    @ApiProperty({
        description: 'Phone number extension (if applicable)',
        example: '123',
        type: String,
        required: false,
    })
    extension: string;

    @ApiProperty({
        description: 'Address line 1 of the company',
        example: '123 Main St',
        type: String,
        required: false,
    })
    addressLine1: string;

    @ApiProperty({
        description: 'Address line 2 of the company (optional)',
        example: 'Suite 400',
        type: String,
        required: false,
    })
    addressLine2: string;

    @ApiProperty({
        description: 'City where the company is located',
        example: 'New York',
        type: String,
        required: false,
    })
    city: string;

    @ApiProperty({
        description: 'State where the company is located',
        example: 'NY',
        type: String,
        required: false,
    })
    state: string;

    @ApiProperty({
        description: 'ZIP code of the company address',
        example: '10001',
        type: String,
        required: false,
    })
    zipCode: string;

    @ApiProperty({
        description: 'Country where the company is located',
        example: 'United States',
        type: String,
        required: false,
    })
    country: string;

    @ApiProperty({
        description: 'The credit card number',
        example: '4242424242424242',
        required: false,
    })
    cardNumber: string;

    @ApiProperty({
        description: 'The expiration month of the card (1-12)',
        example: '12',
        required: false,
    })
    expMonth: string;

    @ApiProperty({
        description: 'The expiration year of the card (4 digits)',
        example: '2025',
        required: false,
    })
    expYear: string;

    @ApiProperty({
        example: '123456',
        description:
            'The unique DOT number validating the company is registered and authorized to operate.',
        required: false,
    })
    dotNumber: string;

    @ApiProperty({
        example: '987654321',
        description: 'Phone.',
        required: false,
    })
    phone: string;

    @ApiProperty({
        example: '24/7',
        description: 'Hours',
        required: false,
    })
    hours: string;

    @ApiProperty({
        example: 'insurance_details',
        description: 'The photo of the insurance.',
        required: false,
    })
    insuranceDetailsId: string;

    @ApiProperty({
        example: 'insurance_details.pdf',
        description:
            "The details of the insurance covering the company's operation.",
        required: false,
    })
    licenseType: string;

};