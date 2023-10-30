import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsIP,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ENUM_LOCALE } from 'src/common/vnpay/constants/locale.enum';

export class CreatePaymentLink {
    @IsNumber()
    @ApiProperty({
        type: Number,
        example: faker.number.int({ max: 100 }),
    })
    amount: number;

    @IsIP()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Client Ipv4 address',
        example: faker.internet.ipv4(),
    })
    ipAddr: string;

    @IsEnum(ENUM_LOCALE)
    @ApiProperty({
        enum: ENUM_LOCALE,
        type: String,
        example: faker.helpers.arrayElement(Object.values(ENUM_LOCALE)),
    })
    locale: ENUM_LOCALE;

    @IsString()
    @MinLength(1)
    @MaxLength(255)
    @ApiProperty({
        type: String,
        example: 'Thank toan don hang',
    })
    orderInfo: string;

    @IsString()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'URL to get the order results information',
        example: faker.internet.url(),
    })
    returnUrl?: string;
}
