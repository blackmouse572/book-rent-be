import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';

export class BookCreateDto {
    @ApiProperty({
        example: faker.music.songName(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    readonly name: string;

    @ApiProperty({
        example: faker.com amerce.price(),
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly rental_price: number;

    @ApiProperty({
        example: faker.helpers.multiple(() => faker.string.uuid(), {
            count: 3,
        }),
        required: true,
        description: 'Category Id',
    })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => String)
    readonly category: string[];

    @ApiProperty({
        example: faker.lorem.paragraph(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    readonly description: string;

    @ApiProperty({
        example: faker.image.url(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(225)
    readonly image: string;

    @ApiProperty({
        example: faker.commerce.price(),
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly deposit: number;

    @ApiProperty({
        example: faker.word.words(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(225)
    readonly keyword: string;

    @ApiProperty({
        example: faker.helpers.multiple(() => faker.string.uuid(), {
            count: 3,
        }),
        required: true,
        description: 'Genres Id',
    })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => String)
    readonly genres: string[];

    @ApiProperty({
        example: faker.person.fullName(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    readonly author: string;
}
