import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
     Min, 
    IsArray, 
    IsOptional } from 'class-validator';

export class GenreCreateDto {
    @ApiProperty({
        description: 'Name of the genre',
        required: true,
        example: 'Fantasy'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    readonly name: string;

    @ApiProperty({
        description: 'Quantity of books in the genre',
        required: true,
        example: 10
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly bookQuantity: number;

    @ApiProperty({
        description: 'Names of the books associated with the genre',
        required: false,
        example: ['Book 1', 'Book 2']
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    readonly bookNames?: string[];
}
