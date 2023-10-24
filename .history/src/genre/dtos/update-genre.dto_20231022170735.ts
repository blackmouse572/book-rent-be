import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, Min, IsArray, IsOptional } from 'class-validator';

export class UpdateGenreDto {
    @ApiProperty({
        description: 'Name of the genre',
        required: false,
        example: 'Fantasy'
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    name?: string;

    @ApiProperty({
        description: 'Updated quantity of books in the genre',
        required: false,
        example: 15
    })
    @IsNumber()
    @Min(0)
    @IsOptional()
    bookQuantity?: number;

    @ApiProperty({
        description: 'Updated names of the books associated with the genre',
        required: false,
        example: ['Updated Book 1', 'Updated Book 2']
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    bookNames?: string[];
}
