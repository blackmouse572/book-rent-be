import { PickType } from '@nestjs/swagger';
import { UserCreateDto } from 'src/user/dtos/create-user.dto';

export class UserUpdateDto extends PickType(UserCreateDto, [
    'fullName',
    'address',
    'phone',
    'email',
] as const) {}
