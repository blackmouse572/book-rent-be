import { PickType } from '@nestjs/swagger';
import { UserCreateDto } from 'src/user/dtos/create-user.dto';

export class UserUpdateNameDto extends PickType(UserCreateDto, [
    'fullName',
] as const) {}
