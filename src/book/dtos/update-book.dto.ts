import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';
import { BOOK_STATUS_ENUM } from 'src/book/constants/book.enum.constants';

export class UpdateBookDto {
    @ApiProperty({
        example: faker.music.songName(),
        required: false,
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    readonly name: string;

    @ApiProperty({
        example: faker.commerce.price(),
        required: false,
        type: 'integer',
    })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    readonly rental_price: number;

    @ApiProperty({
        example: faker.helpers.multiple(
            () => faker.database.mongodbObjectId(),
            {
                count: 3,
            }
        ),
        required: false,
        description: 'Category Id',
    })
    @Transform(({ value }) => JSON.parse(value))
    @IsArray()
    @ArrayNotEmpty()
    @IsOptional()
    readonly category: string[];

    @ApiProperty({
        example: faker.lorem.paragraph(),
        required: false,
    })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly description: string;

    @ApiProperty({
        example: faker.word.words(),
        required: false,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(225)
    @IsOptional()
    readonly keyword: string;

    @ApiProperty({
        example: faker.helpers.multiple(() => faker.music.genre(), {
            count: 3,
        }),
        required: false,
    })
    @Transform(({ value }) => JSON.parse(value))
    @IsArray()
    @IsOptional()
    readonly genres: string[];

    @ApiProperty({
        example: faker.person.fullName(),
        required: false,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @IsOptional()
    readonly author: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        required: false,
    })
    @IsOptional()
    readonly image: Express.Multer.File;

    @ApiProperty({
        enum: BOOK_STATUS_ENUM,
        required: false,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @IsOptional()
    readonly status: BOOK_STATUS_ENUM;
}
