import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { ENUM_ROLE_TYPE } from 'src/user/constants/user.enum.constants';
import { UserCreateDto } from 'src/user/dtos/create-user.dto';

export default class AddUserDto extends UserCreateDto {
    @ApiProperty({
        example: faker.helpers.arrayElement(Object.values(ENUM_ROLE_TYPE)),
        required: true,
    })
    @IsEnum(ENUM_ROLE_TYPE)
    readonly role: ENUM_ROLE_TYPE;

    @ApiProperty({
        example: faker.datatype.boolean(),
        required: false,
    })
    @Type(() => Boolean)
    blocked?: boolean;
}
