import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class OrderRequestDto {
    @IsNotEmpty()
    @IsMongoId()
    @Type(() => String)
    id: string;
}
