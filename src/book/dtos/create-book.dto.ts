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

export class CreateBookDto {
    @ApiProperty({
        example: faker.music.songName(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    readonly name: string;

    @ApiProperty({
        example: faker.commerce.price(),
        required: true,
        type: 'integer',
    })
    @Type(() => Number)
    @IsNotEmpty()
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
        required: true,
        description: 'Category Id',
    })
    @Transform(({ value }) => JSON.parse(value))
    @IsArray()
    @ArrayNotEmpty()
    readonly category: string[];

    @ApiProperty({
        example: faker.lorem.paragraph(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({
        example: faker.word.words(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(225)
    readonly keyword: string;

    @ApiProperty({
        example: faker.helpers.multiple(() => faker.music.genre(), {
            count: 3,
        }),
        required: true,
        description: 'Category Id',
    })
    @Transform(({ value }) => JSON.parse(value))
    @IsArray()
    @ArrayNotEmpty()
    @IsOptional()
    readonly genres: string[];

    @ApiProperty({
        example: faker.person.fullName(),
        required: true,
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
    readonly image: Express.Multer.File;
}
