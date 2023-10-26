import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';
import { GenreCreateDto } from 'src/genre/dtos/create-genre.dto';

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
        example: faker.commerce.price(),
        required: true,
        type: 'integer',
    })
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
        required: true,
        description: 'Genres datas',
        type: [GenreCreateDto],
    })
    @IsArray()
    @ArrayNotEmpty()
    readonly genres: GenreCreateDto[];

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
        required: true,
    })
    readonly image: Express.Multer.File;
}
