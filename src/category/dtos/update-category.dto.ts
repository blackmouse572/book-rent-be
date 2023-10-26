import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsEnum } from 'class-validator';
import { CATEGORY_STATUS_ENUM } from 'src/category/constants/category.enum.constants';
import { faker } from '@faker-js/faker';

export class CategoryUpdateDto {
    @ApiProperty({
        example: faker.commerce.productMaterial(),
        required: false,
        description: 'Name of the category',
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    name?: string;

    @ApiProperty({
        example: faker.commerce.productDescription(),
        required: false,
        description: 'Description of the category',
    })
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description?: string;

    @ApiProperty({
        example: CATEGORY_STATUS_ENUM.ENABLE,
        required: false,
        description: 'Status of the category',
        enum: CATEGORY_STATUS_ENUM,
    })
    @IsOptional()
    @IsEnum(CATEGORY_STATUS_ENUM)
    status?: CATEGORY_STATUS_ENUM;
}
