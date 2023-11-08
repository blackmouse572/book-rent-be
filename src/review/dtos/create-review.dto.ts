import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export class ReviewCreateDto {
    @ApiProperty({
        example: faker.lorem.paragraph(),
        required: false,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(225)
    @IsOptional()
    readonly comment?: string;

    @ApiProperty({
        example: faker.number.int({ min: 0, max: 5 }),
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @Min(0)
    @Max(5)
    readonly rating: number;
}
