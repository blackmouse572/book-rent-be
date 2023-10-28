import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
} from 'class-validator';
import { Types } from 'mongoose';
import {
    ENUM_DEPOSIT_TYPE,
    ENUM_ORDER_STATUS,
} from 'src/order/constants/order.enum';

export class PlaceOrderDto {
    @ApiProperty({
        example: faker.database.mongodbObjectId(),
        required: true,
    })
    @IsNotEmpty()
    @IsMongoId()
    bookId: string | Types.ObjectId;

    @ApiProperty({
        example: faker.date.future(),
        required: true,
    })
    @IsNotEmpty()
    @IsDateString()
    rentalDate: Date;

    @ApiProperty({
        example: faker.date.future(),
        required: true,
    })
    @IsNotEmpty()
    @IsDateString()
    returnDate: Date;

    @ApiProperty({
        example: faker.number.int(),
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;

    @ApiProperty({
        example: faker.location.streetAddress(),
        required: true,
        description: 'Pickup Location',
    })
    @IsNotEmpty()
    @IsString()
    pickupLocation: string;

    @ApiProperty({
        example: faker.location.streetAddress(),
        required: true,
        description: 'Return Location',
    })
    @IsNotEmpty()
    @IsString()
    returnLocation: string;

    @ApiProperty({
        example: ENUM_DEPOSIT_TYPE.COD,
        enum: ENUM_DEPOSIT_TYPE,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    despositType: ENUM_DEPOSIT_TYPE;
}

export class CreateOrderDTO extends PlaceOrderDto {
    userId: string;
    totalPrice: number;
    status: ENUM_ORDER_STATUS;
}
