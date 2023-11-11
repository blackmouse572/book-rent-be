import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetCheckoutUrlDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type: Number,
        example: faker.number.int({ max: 100 }),
    })
    amount: number;

    @ApiProperty({
        example: faker.database.mongodbObjectId(),
        required: true,
    })
    @IsNotEmpty()
    @IsMongoId()
    orderId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'URL to get the order results information',
        example: faker.internet.url(),
    })
    returnUrl: string;
}
