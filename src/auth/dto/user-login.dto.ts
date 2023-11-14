import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UserLoginDto {
    @IsString()
    @MinLength(6)
    @ApiProperty({
        example: 'test1234',
    })
    usernameOrEmail: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({
        example: 'Demo1234',
    })
    password: string;
}
