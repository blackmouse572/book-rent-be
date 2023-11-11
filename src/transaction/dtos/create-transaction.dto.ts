import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    Min
} from 'class-validator';

export class CreateTransactionDto {
    @ApiProperty({
        example: faker.database.mongodbObjectId(),
        required: true,
    })
    @IsNotEmpty()
    @IsMongoId()
    orderId: string;

    @ApiProperty({
        example: faker.commerce.price(),
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount: number;
}

