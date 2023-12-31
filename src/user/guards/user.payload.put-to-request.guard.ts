import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IRequestApp } from 'src/common/pagination/interfaces/request.interface';
import { UserDoc } from 'src/user/repository/user.entity';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class UserPayloadPutToRequestGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<IRequestApp & { __user: UserDoc }>();
        const { user } = request;

        const check: UserDoc = await this.userService.findOneById(user._id, {
            join: true,
        });
        request.__user = check;

        return true;
    }
}
