import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ENUM_DEPOSIT_TYPE } from 'src/order/constants/order.enum';

export class UpdateOrderBasicDto {
    @ApiProperty({
        example: faker.date.future(),
    })
    @IsOptional()
    @IsDateString()
    rentalDate?: Date;

    @ApiProperty({
        example: faker.date.future(),
    })
    @IsOptional()
    @IsDateString()
    returnDate?: Date;

    @ApiProperty({
        example: faker.location.streetAddress(),
        description: 'Pickup Location',
    })
    @IsOptional()
    @IsString()
    pickupLocation?: string;

    @ApiProperty({
        example: faker.location.streetAddress(),
        description: 'Return Location',
    })
    @IsOptional()
    @IsString()
    returnLocation?: string;

    @ApiProperty({
        example: ENUM_DEPOSIT_TYPE.COD,
        enum: ENUM_DEPOSIT_TYPE,
    })
    @IsOptional()
    @IsEnum(ENUM_DEPOSIT_TYPE)
    depositType?: ENUM_DEPOSIT_TYPE;
}
