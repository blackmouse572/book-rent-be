import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsNumber,
    IsString,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';

export class BookUpdateDto {
    @ApiProperty({
        example: faker.music.songName(),
    })
    @IsString()
    @MaxLength(100)
    readonly name?: string;

    @ApiProperty({
        example: faker.commerce.price(),
    })
    @IsNumber()
    @Min(0)
    readonly rental_price?: number;

    @ApiProperty({
        example: faker.helpers.multiple(() => faker.string.uuid(), {
            count: 3,
        }),
        description: 'Category Id',
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    readonly category?: string[];

    @ApiProperty({
        example: faker.lorem.paragraph(),
    })
    @IsString()
    @Type(() => String)
    readonly description?: string;

    @ApiProperty({
        example: faker.image.url(),
    })
    @IsString()
    @MaxLength(225)
    readonly image?: string;

    @ApiProperty({
        example: faker.commerce.price(),
    })
    @IsNumber()
    @Min(0)
    readonly deposit?: number;

    @ApiProperty({
        example: faker.word.words(),
    })
    @IsString()
    @MaxLength(225)
    readonly keyword?: string;

    @ApiProperty({
        example: faker.helpers.multiple(() => faker.string.uuid(), {
            count: 3,
        }),
        description: 'Genres Id',
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    readonly genres?: string[];

    @ApiProperty({
        example: faker.person.fullName(),
    })
    @IsString()
    @MaxLength(50)
    readonly author?: string;
}
