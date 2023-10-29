import { Type } from 'class-transformer';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { ENUM_ORDER_STATUS } from 'src/order/constants/order.enum';

export class OrderRequestDto {
    @IsNotEmpty()
    @IsMongoId()
    @Type(() => String)
    id: string;
}

export class OrderUpdateStatusRequestDto {
    @IsNotEmpty()
    @IsMongoId()
    @Type(() => String)
    id: string;

    @IsNotEmpty()
    @IsEnum(ENUM_ORDER_STATUS)
    status: ENUM_ORDER_STATUS;
}
