import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
} from 'class-validator';
import {
    ENUM_DEPOSIT_TYPE,
    ENUM_ORDER_STATUS,
} from 'src/order/constants/order.enum';

export class PlaceOrderCartDto {
    @ApiProperty({
        example: faker.database.mongodbObjectId(),
        required: true,
    })
    @IsNotEmpty()
    @IsMongoId()
    bookId: string;

    @ApiProperty({
        example: faker.number.int({ max: 10 }),
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
}
export class PlaceOrderDto {
    @ApiProperty({
        description: 'Cart of order',
        required: true,
        type: [PlaceOrderCartDto],
    })
    cart: PlaceOrderCartDto[];

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
    @IsEnum(ENUM_DEPOSIT_TYPE)
    depositType: ENUM_DEPOSIT_TYPE;
}

export class CreateOrderDTO extends PlaceOrderDto {
    userId: string;
    totalPrice: number;
    status: ENUM_ORDER_STATUS;
}
