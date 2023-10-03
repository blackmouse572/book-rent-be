import { Controller } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
