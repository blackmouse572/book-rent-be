import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ENUM_CITIZEN_ID_TYPE } from 'src/auth/constants/auth.enum.constant';
import { UserCreateDto } from 'src/user/dtos/create-user.dto';

export class UserSignUpDto extends UserCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(9)
    @MaxLength(12)
    citizenId: string;

    @IsNotEmpty()
    @IsEnum(ENUM_CITIZEN_ID_TYPE)
    citizenIdType: ENUM_CITIZEN_ID_TYPE;

    @IsNotEmpty()
    @IsDateString()
    citizenIdIssueDate: Date;

    @IsNotEmpty()
    @IsDateString()
    citizenIdDateOfBirth: Date;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    citizenIdPlaceOfIssue: string;
}
