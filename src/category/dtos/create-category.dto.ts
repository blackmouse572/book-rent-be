import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CategoryCreateDto {
    @ApiProperty({
        example: faker.commerce.productMaterial(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    readonly name: string;

    @ApiProperty({
        example: faker.commerce.productDescription(),
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(1000)
    readonly description: string;
}
