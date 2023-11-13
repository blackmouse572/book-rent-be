import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsEnum,
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
    })
    @IsString()
    @MaxLength(100)
    readonly name: string;

    @ApiProperty({
        example: faker.commerce.price(),
        type: 'integer',
    })
    @Type(() => Number)
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
        description: 'Category Id',
    })
    @Transform(({ value }) => JSON.parse(value))
    @IsArray()
    @ArrayNotEmpty()
    readonly category: string[];

    @ApiProperty({
        example: faker.lorem.paragraph(),
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(1000)
    readonly description: string;

    @ApiProperty({
        example: faker.word.words(),
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(225)
    readonly keyword: string;

    @ApiProperty({
        example: faker.helpers.multiple(() => faker.music.genre(), {
            count: 3,
        }),
    })
    @Transform(({ value }) => JSON.parse(value))
    @IsArray()
    readonly genres: string[];

    @ApiProperty({
        example: faker.person.fullName(),
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
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
    })
    @IsNotEmpty()
    @IsEnum(BOOK_STATUS_ENUM)
    readonly status: BOOK_STATUS_ENUM;

    @ApiProperty({
        example: faker.lorem.paragraph(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    readonly statusDescription: string;
}
