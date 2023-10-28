import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import {
    AuthJwtAccessProtected,
    AuthJwtPayload,
} from 'src/auth/decorators/auth.jwt.decorator';
import { BookEntity } from 'src/book/repository/book.entity';
import { BookService } from 'src/book/services/book.service';
import {
    PaginationQuery,
    PaginationQueryFilterDate,
} from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dto/pagination.list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { RequestParamGuard } from 'src/lib/guards/request.decorator';
import {
    ORDER_DEFAULT_AVAILABLE_ORDER_BY,
    ORDER_DEFAULT_AVAILABLE_SEARCH,
    ORDER_DEFAULT_ORDER_BY,
    ORDER_DEFAULT_ORDER_DIRECTION,
    ORDER_DEFAULT_PERPAGE,
} from 'src/order/constants/order.constant';
import { PlaceOrderDto } from 'src/order/dtos/create-order.dto';
import { OrderRequestDto } from 'src/order/dtos/request-order.dto';
import { OrderService } from 'src/order/services/order.service';
import { UserService } from 'src/user/services/user.service';

@ApiBearerAuth('accessToken')
@ApiTags('modules.authenticated.order')
@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly bookService: BookService,
        private readonly userService: UserService,
        private readonly paginationService: PaginationService
    ) {}

    @ApiOperation({
        summary: 'Place order',
        description: 'Place order',
    })
    @Post()
    @AuthJwtAccessProtected()
    async placeOrder(
        @Body() placeOrder: PlaceOrderDto,
        @AuthJwtPayload() payload: Record<string, any>
    ) {
        const { _id: userId } = payload;
        const { bookId, rentalDate, returnDate } = placeOrder;

        const book = await this.bookService.findOneById(bookId.toString());

        if (!book) {
            throw new NotFoundException('Book not found');
        }

        if (rentalDate > returnDate) {
            throw new NotFoundException(
                'Rental date must be less than return date'
            );
        }
        const total_price = book.rental_price * placeOrder.quantity;

        return this.orderService.create(placeOrder, userId, total_price);
    }

    @ApiOperation({
        summary: 'Get all orders',
        description: 'Get all orders',
    })
    @AuthJwtAccessProtected()
    @Get()
    async getAllOrders(
        @AuthJwtPayload() payload: Record<string, any>,
        @PaginationQuery(
            ORDER_DEFAULT_PERPAGE,
            ORDER_DEFAULT_ORDER_BY,
            ORDER_DEFAULT_ORDER_DIRECTION,
            ORDER_DEFAULT_AVAILABLE_SEARCH,
            ORDER_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto,
        @PaginationQueryFilterDate('rentalDate')
        rentalDate: Record<string, any>,
        @PaginationQueryFilterDate('returnDate') returnDate: Record<string, any>
    ): Promise<any> {
        const { _id: userId } = payload;
        const find: Record<string, any> = {
            ..._search,
            ...rentalDate,
            ...returnDate,
            userId: new Types.ObjectId(userId),
        };
        const orders = await this.orderService.findAll(find, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
            join: [
                {
                    path: 'bookId',
                    foreignField: '_id',
                    localField: 'bookId',
                    select: 'name',
                },
                {
                    path: 'userId',
                    foreignField: '_id',
                    localField: 'userId',
                    select: 'username',
                },
            ],
        });
        const total: number = await this.orderService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );
        return {
            _pagination: { total, totalPage },
            data: orders,
        };
    }

    @ApiOperation({
        summary: 'Get order details by id',
        description: 'Query order details by id',
    })
    @AuthJwtAccessProtected()
    @RequestParamGuard(OrderRequestDto)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<BookEntity> {
        return this.orderService.findOneById(id);
    }
}
