import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthJwtAdminAccessProtected } from 'src/auth/decorators/auth.jwt.decorator';
import { HelperHashService } from 'src/common/helpers/services/helper.hash.service';
import {
    PaginationQuery,
    PaginationQueryFilterInBoolean,
    PaginationQueryFilterInEnum,
} from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dto/pagination.list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { RequestParamGuard } from 'src/lib/guards/request.decorator';
import { ENUM_ROLE_TYPE } from 'src/user/constants/user.enum.constants';
import {
    USER_DEFAULT_AVAILABLE_ORDER_BY,
    USER_DEFAULT_AVAILABLE_SEARCH,
    USER_DEFAULT_BLOCKED,
    USER_DEFAULT_ORDER_BY,
    USER_DEFAULT_ORDER_DIRECTION,
    USER_DEFAULT_PER_PAGE,
    USER_DEFAULT_ROLE,
} from 'src/user/constants/user.list-constants';
import {
    UserAdminGetGuard,
    UserAdminUpdateBlockedGuard,
    UserAdminUpdateUnBlockGuard,
} from 'src/user/decorators/user.admin.decorator';
import AddUserDto from 'src/user/dtos/add-user.dto';
import { UserRequestDto } from 'src/user/dtos/get-user.dto';
import { IUserEntity } from 'src/user/interfaces/user.interface';
import { UserDoc } from 'src/user/repository/user.entity';
import { UserService } from 'src/user/services/user.service';
@ApiTags('modules.admin.user')
@ApiBearerAuth('accessToken')
@Controller({
    path: '/user',
})
export class UserManageController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly hashService: HelperHashService,
        private readonly userService: UserService
    ) {}

    @ApiOperation({
        tags: ['admin', 'user'],
        description: 'Get list of users in database',
        summary: 'List user',
    })
    @AuthJwtAdminAccessProtected()
    @Get('/')
    async list(
        @PaginationQuery(
            USER_DEFAULT_PER_PAGE,
            USER_DEFAULT_ORDER_BY,
            USER_DEFAULT_ORDER_DIRECTION,
            USER_DEFAULT_AVAILABLE_SEARCH,
            USER_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto,
        @PaginationQueryFilterInBoolean('blocked', USER_DEFAULT_BLOCKED)
        blocked: Record<string, any>,
        @PaginationQueryFilterInEnum('role', USER_DEFAULT_ROLE, ENUM_ROLE_TYPE)
        role: Record<string, any>
    ) {
        const find: Record<string, any> = {
            ..._search,
            ...blocked,
            ...role,
        };

        const users: IUserEntity[] = await this.userService.findAll(find, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
        });

        const total: number = await this.userService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage },
            data: users,
        };
    }

    @ApiOperation({
        tags: ['admin', 'user'],
        description: 'Add new user into database',
        summary: 'Add a new user',
    })
    @AuthJwtAdminAccessProtected()
    @Post('/')
    async addUser(@Body() dto: AddUserDto) {
        const { password } = dto;
        const salt = this.hashService.randomSalt(10);
        const passwordHash = this.hashService.bcrypt(password, salt);
        const user = await this.userService.create(dto, { passwordHash, salt });
        return user;
    }

    @UserAdminGetGuard()
    @RequestParamGuard(UserRequestDto)
    @AuthJwtAdminAccessProtected()
    @Get('/get/:user')
    async get(@Param('user') userId: string): Promise<any> {
        const user = await this.userService.findOneById(userId);
        return user;
    }

    @ApiOperation({
        summary: "Ban user's account",
        description: 'Ban user account, this will prevent user from login',
        tags: ['admin', 'user'],
    })
    @UserAdminUpdateBlockedGuard()
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(UserRequestDto)
    @Post('/ban/:user')
    async banUser(@Param('user') userId: string) {
        const user: UserDoc = await this.userService.findOneById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (user.blocked) {
            throw new BadRequestException('User already blocked');
        }
        await this.userService.blocked(user);

        return {
            message: 'User blocked',
            isSuccess: true,
            data: user.toObject(),
        };
    }

    @ApiOperation({
        summary: "Restore user's account ban",
        description:
            'Restore ban user account, this will allow user to login again',
        tags: ['admin', 'user'],
    })
    @UserAdminUpdateUnBlockGuard()
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(UserRequestDto)
    @Post('/unban/:user')
    async unBan(@Param('user') userId: string) {
        const user: UserDoc = await this.userService.findOneById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (!user.blocked) {
            throw new BadRequestException('User already un-blocked');
        }
        await this.userService.unblocked(user);

        return {
            message: 'User un-blocked',
            isSuccess: true,
            data: user.toObject(),
        };
    }
}
