import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthJwtAdminAccessProtected } from 'src/auth/decorators/auth.jwt.decorator';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { UserService } from 'src/user/services/user.service';
@ApiTags('modules.admin.user')
@Controller({
    path: '/user',
})
export class UserManageController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly userService: UserService
    ) {}

    //TODO: IMPLEMENT POLICY HERE
    @ApiOperation({
        tags: ['admin', 'user'],
        description: 'Get list of users in database',
        summary: 'List user',
    })
    @AuthJwtAdminAccessProtected()
    @Get('/list')
    async list() {}
}
