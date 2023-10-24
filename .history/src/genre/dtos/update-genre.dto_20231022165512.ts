import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsNumber,
    IsString,
    MaxLength,
    Min,
    IsOptional,
} from 'class-validator';

export class UpdateGenreDto {
    @ApiProperty({
        example: faker.music.songName(),
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    readonly name?: string;

    @ApiProperty({
        example: faker.number.int({ min: 0, max: 100 }),
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    readonly quantity?: number;
}
