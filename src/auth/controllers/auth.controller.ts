import { BadRequestException, Body, ConflictException, Controller, ForbiddenException, HttpCode, HttpStatus, NotFoundException, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ENUM_AUTH_LOGIN_WITH } from 'src/auth/constants/auth.enum.constant';
import { AuthJwtRefreshProtected, AuthJwtToken } from 'src/auth/decorators/auth.jwt.decorator';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { UserSignUpDto } from 'src/auth/dto/user-signup.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { GetUser, UserAuthProtected, UserProtected } from 'src/user/decorators/user.decorator';
import { UserDoc } from 'src/user/repository/user.entity';
import { UserService } from 'src/user/services/user.service';

@ApiTags('modules.common.auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        tags: ["auth"],
        description: "Login with local credentials"
    })
    @Post('login')
    async login(@Body() { password, usernameOrEmail }: UserLoginDto) {
        const _userEmailDoc: UserDoc | null = await this.userService.findOneByEmail(usernameOrEmail);
        const _userUsernameDoc: UserDoc | null = await this.userService.findOneByUsername(usernameOrEmail);
        const user = _userEmailDoc ?? _userUsernameDoc;

        if (!user) {
            throw new NotFoundException({
                message: "User not found",
            })
        }

        const validate: boolean = await this.authService.validateUser(
            password,
            user.password
        )
        if (!validate) {
            await this.userService.increasePasswordAttempt(user)

            throw new BadRequestException({
                message: "Invalid credentials"
            })

        } else if (user.blocked) {
            throw new ForbiddenException({
                message: "User is blocked"
            })
        }

        await this.userService.resetPasswordAttempt(user);

        const payload = {
            user_id: user.id,
            user_phone: user.phone,
        }

        const expiresIn: number = await this.authService.getAccessTokenExpirationTime();
        const tokenType: string = await this.authService.getTokenType();
        const payloadAccessToken = await this.authService.createPayloadAccessToken(payload)
        const payloadRefreshToken = await this.authService.createPayloadRefreshToken(payload.user_id, {
            loginWith: ENUM_AUTH_LOGIN_WITH.CREDENTIALS
        });


        const payloadEncryption = await this.authService.getPayloadEncryption()

        let payloadHashedAccessToken: Record<string, any> | string =
            payloadAccessToken;
        let payloadHashedRefreshToken: Record<string, any> | string =
            payloadRefreshToken;

        if (payloadEncryption) {
            payloadHashedAccessToken =
                await this.authService.encryptAccessToken(payloadAccessToken);
            payloadHashedRefreshToken =
                await this.authService.encryptRefreshToken(payloadRefreshToken);
        }

        const accessToken: string = await this.authService.createAccessToken(
            payloadHashedAccessToken
        );

        const refreshToken: string = await this.authService.createRefreshToken(
            payloadHashedRefreshToken
        );
        return {
            data: {
                tokenType,
                expiresIn,
                accessToken,
                refreshToken,
            },
        };
    }

    @Post('/sign-up')
    async signUp(
        @Body()
        { email, phone, username, ...body }: UserSignUpDto
    ): Promise<void> {
        const promises: Promise<boolean>[] = [
            this.userService.existByPhoneNumber(phone),
            this.userService.existByUsername(username),
            this.userService.existByEmail(email)
        ]

        const [phoneExist, usernameExist, emailExist] = await Promise.all(promises)

        if (phoneExist) {
            throw new ConflictException({
                message: 'Phone existed'
            })
        } else if (usernameExist) {
            throw new ConflictException({
                message: "Username existed"
            })
        } else if (emailExist) {
            throw new ConflictException({
                message: 'Email existed'
            })
        }


        const password = await this.authService.createPassword(body.password
        )

        await this.userService.create({
            email,
            username,
            phone,
            ...body
        }, password)

        return;
    }

    @ApiOperation({
        tags: ['refresh', 'jwt'],
        description: "Revoke new access token using refresh token",
        summary: "Get new access token"
    })
    @HttpCode(HttpStatus.OK)
    @UserAuthProtected()
    @UserProtected()
    @AuthJwtRefreshProtected()
    @Post('refresh')
    async refresh(
        @AuthJwtToken() refreshToken: string,
        @GetUser() user: UserDoc,
    ) {
        const payload = {
            user_id: user.id,
            user_phone: user.phone,
        }

        const expiresIn: number = await this.authService.getAccessTokenExpirationTime();
        const tokenType: string = await this.authService.getTokenType();
        const payloadAccessToken = await this.authService.createPayloadAccessToken(payload)
        const payloadRefreshToken = await this.authService.createPayloadRefreshToken(payload.user_id, {
            loginWith: ENUM_AUTH_LOGIN_WITH.CREDENTIALS
        });


        const payloadEncryption = await this.authService.getPayloadEncryption()

        let payloadHashedAccessToken: Record<string, any> | string =
            payloadAccessToken;
        let payloadHashedRefreshToken: Record<string, any> | string =
            payloadRefreshToken;

        if (payloadEncryption) {
            payloadHashedAccessToken =
                await this.authService.encryptAccessToken(payloadAccessToken);
            payloadHashedRefreshToken =
                await this.authService.encryptRefreshToken(payloadRefreshToken);
        }

        const accessToken: string = await this.authService.createAccessToken(
            payloadHashedAccessToken
        );


        return {
            data: {
                tokenType,
                expiresIn,
                accessToken,
                refreshToken,
            },
        };
    }
}
