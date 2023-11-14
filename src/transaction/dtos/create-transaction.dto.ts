import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { TRANSACTION_TYPE_ENUM } from 'src/transaction/constants/transaction.enum';

export class CreateTransactionDto {
    @ApiProperty({
        example: faker.database.mongodbObjectId(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    orderId: string;

    @ApiProperty({
        example: faker.commerce.price(),
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount: number;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    payDateStamp: string;

    @IsNotEmpty()
    @IsEnum(TRANSACTION_TYPE_ENUM)
    readonly type: TRANSACTION_TYPE_ENUM;
}
