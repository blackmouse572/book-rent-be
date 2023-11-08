import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ReviewRequestDto {
    @IsNotEmpty()
    @IsMongoId()
    @Type(() => String)
    bookId: string;
}
