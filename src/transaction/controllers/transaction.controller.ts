import {
    Body,
    Controller,
    Get,
    Ip,
    NotFoundException,
    Param,
    Post,
    Request,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
    AuthJwtAccessProtected,
    AuthJwtAdminAccessProtected,
} from 'src/auth/decorators/auth.jwt.decorator';
import { BookDoc } from 'src/book/repository/book.entity';
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dto/pagination.list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { ENUM_LOCALE } from 'src/common/vnpay/constants/locale.enum';
import { VNPayGatewayService } from 'src/common/vnpay/services/vnpay-gateway.service';
import { OrderService } from 'src/order/services/order.service';
import {
    TRANSACTION_DEFAULT_AVAILABLE_ORDER_BY,
    TRANSACTION_DEFAULT_AVAILABLE_SEARCH,
    TRANSACTION_DEFAULT_ORDER_BY,
    TRANSACTION_DEFAULT_ORDER_DIRECTION,
    TRANSACTION_DEFAULT_PER_PAGE,
} from 'src/transaction/constants/transaction.list-constants';
import { CreateTransactionDto } from 'src/transaction/dtos/create-transaction.dto';
import { GetCheckoutUrlDto } from 'src/transaction/dtos/get-checkoutUrl';
import {
    TransactionDoc,
    TransactionEntity,
} from 'src/transaction/repository/transaction.entity';
import { TransactionService } from 'src/transaction/services/transaction.service';
import { GetUser, UserProtected } from 'src/user/decorators/user.decorator';
import { UserDoc } from 'src/user/repository/user.entity';

@Controller('transaction')
export class TransactionController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly transactionService: TransactionService,
        private readonly orderService: OrderService,
        private readonly vnpayService: VNPayGatewayService
    ) {}

    @ApiOperation({
        tags: ['transaction'],
        description: 'create transaction',
    })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Post()
    async create(
        @Body() dto: CreateTransactionDto,
        @GetUser() user: UserDoc
    ): Promise<TransactionDoc> {
        const order = await this.orderService.findOneById(dto.orderId);

        if (!order) {
            throw new NotFoundException({
                message: `Can not find order with id: ${dto.orderId}`,
            });
        }

        const entity = new TransactionEntity();
        entity.user = user;
        entity.order = order;
        entity.amount = dto.amount;

        return await this.transactionService.create(entity);
    }

    @ApiOperation({
        tags: ['transaction'],
        description: 'Get list of all transaction of all user',
    })
    @AuthJwtAdminAccessProtected()
    @Get('admin/list')
    async list(
        @PaginationQuery(
            TRANSACTION_DEFAULT_PER_PAGE,
            TRANSACTION_DEFAULT_ORDER_BY,
            TRANSACTION_DEFAULT_ORDER_DIRECTION,
            TRANSACTION_DEFAULT_AVAILABLE_SEARCH,
            TRANSACTION_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto
    ): Promise<{
        _pagination: { total: number; totalPage: number };
        data: TransactionEntity[];
    }> {
        const find: Record<string, any> = {
            ..._search,
        };

        const transactions: TransactionEntity[] =
            await this.transactionService.findAll(find, {
                paging: {
                    limit: _limit,
                    offset: _offset,
                },
                order: _order,
                join: {
                    path: 'user',
                    select: 'id username fullName email avatar',
                },
            });

        const total: number = await this.transactionService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage },
            data: transactions,
        };
    }

    @ApiOperation({
        tags: ['transaction'],
        description: 'Get list of all transaction of current user',
    })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Get('me/list')
    async listMe(
        @PaginationQuery(
            TRANSACTION_DEFAULT_PER_PAGE,
            TRANSACTION_DEFAULT_ORDER_BY,
            TRANSACTION_DEFAULT_ORDER_DIRECTION,
            TRANSACTION_DEFAULT_AVAILABLE_SEARCH,
            TRANSACTION_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto,
        @GetUser() user: UserDoc
    ): Promise<{
        _pagination: { total: number; totalPage: number };
        data: TransactionEntity[];
    }> {
        const find: Record<string, any> = { user };

        const transactions: TransactionEntity[] =
            await this.transactionService.findAll(find, {
                paging: {
                    limit: _limit,
                    offset: _offset,
                },
                order: _order,
                join: {
                    path: 'user',
                    select: 'id username fullName email avatar',
                },
            });

        const total: number = await this.transactionService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage },
            data: transactions,
        };
    }

    // @AuthJwtAccessProtected()
    @Post('checkoutUrl')
    async getById(@Body() dto: GetCheckoutUrlDto, @Ip() ip): Promise<String> {
        const order = await this.orderService.findOneById(dto.orderId);
        if (!order) {
            throw new NotFoundException({
                message: `Can not found order with id: ${dto.orderId}`,
            });
        }

        return this.vnpayService.createPaymentLink({
            amount: dto.amount,
            ipAddr: ip,
            locale: ENUM_LOCALE.VN,
            orderInfo: dto.orderId,
            returnUrl: dto.returnUrl,
        });
    }
}
