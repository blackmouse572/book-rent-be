import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/user/services/user.service';

@ApiTags('modules.common.auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() { password, usernameOrEmail }: UserLoginDto) {}
}
