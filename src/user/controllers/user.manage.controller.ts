import {
    BadRequestException,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthJwtAdminAccessProtected } from 'src/auth/decorators/auth.jwt.decorator';
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
    USER_DEFAULT_INACTIVE_PERMANENT,
    USER_DEFAULT_IS_ACTIVE,
    USER_DEFAULT_ORDER_BY,
    USER_DEFAULT_ORDER_DIRECTION,
    USER_DEFAULT_PER_PAGE,
    USER_DEFAULT_ROLE,
} from 'src/user/constants/user.list-constants';
import {
    UserAdminGetGuard,
    UserAdminUpdateBlockedGuard,
} from 'src/user/decorators/user.admin.decorator';
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
        @PaginationQueryFilterInBoolean('isActive', USER_DEFAULT_IS_ACTIVE)
        isActive: Record<string, any>,
        @PaginationQueryFilterInBoolean('blocked', USER_DEFAULT_BLOCKED)
        blocked: Record<string, any>,
        @PaginationQueryFilterInBoolean(
            'inactivePermanent',
            USER_DEFAULT_INACTIVE_PERMANENT
        )
        inactivePermanent: Record<string, any>,
        @PaginationQueryFilterInEnum('role', USER_DEFAULT_ROLE, ENUM_ROLE_TYPE)
        role: Record<string, any>
    ) {
        const find: Record<string, any> = {
            ..._search,
            ...isActive,
            ...blocked,
            ...inactivePermanent,
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
    @UserAdminUpdateBlockedGuard()
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(UserRequestDto)
    @Post('/unban/:user')
    async unBan(@Param() userId: string) {
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

    @UserAdminGetGuard()
    @RequestParamGuard(UserRequestDto)
    @AuthJwtAdminAccessProtected()
    @Get('/seed')
    async seed(@Query('amount') amount: number = 30) {
        const users = Array.from(Array(amount).keys()).map((index: number) => {
            return {
                email: ` ${index} ${new Date().getTime()}@gmail.com`,
                password: '123456',
            };
        });
        return users;
    }
}
