import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';

export class GenreCreateDto {
    @ApiProperty({
        example: faker.music.songName(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    readonly name: string;

    @ApiProperty({
        example: faker.number.int({ min: 0, max: 100 }),
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly quantity: number;
}
