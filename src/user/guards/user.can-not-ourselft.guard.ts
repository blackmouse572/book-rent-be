import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { IRequestApp } from 'src/common/pagination/interfaces/request.interface';
import { UserDoc } from 'src/user/repository/user.entity';

@Injectable()
export class UserCanNotOurSelfGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { __user, user } = context
            .switchToHttp()
            .getRequest<IRequestApp & { __user: UserDoc }>();
        if (__user._id === user.id) {
            throw new NotFoundException({
                message: 'User not found',
                trace: 'UserCanNotOurSelfGuard',
            });
        }

        return true;
    }
}
