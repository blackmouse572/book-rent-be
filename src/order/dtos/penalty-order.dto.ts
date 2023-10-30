import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class PenaltyOrderDto {
    @ApiProperty({
        example: faker.number.int(),
    })
    @IsNumber()
    penalty: number;

    @ApiProperty({
        example: faker.lorem.paragraphs(),
        minLength: 10,
        maxLength: 500,
    })
    @IsString()
    @MinLength(10)
    @MaxLength(500)
    penaltyReason: string;
}
