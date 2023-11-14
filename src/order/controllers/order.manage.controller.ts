import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Ip,
    NotFoundException,
    Param,
    Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
    AuthJwtAccessProtected,
    AuthJwtAdminAccessProtected,
} from 'src/auth/decorators/auth.jwt.decorator';
import { HelperEncryptionService } from 'src/common/helpers/services/helper.encryption.service';
import {
    PaginationQuery,
    PaginationQueryFilterDate,
    PaginationQueryFilterInEnum,
} from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dto/pagination.list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { ENUM_LOCALE } from 'src/common/vnpay/constants/locale.enum';
import { VNPayGatewayService } from 'src/common/vnpay/services/vnpay-gateway.service';
import { RequestParamGuard } from 'src/lib/guards/request.decorator';
import {
    ORDER_DEFAULT_AVAILABLE_ORDER_BY,
    ORDER_DEFAULT_AVAILABLE_SEARCH,
    ORDER_DEFAULT_DEPOSIT_TYPE,
    ORDER_DEFAULT_ORDER_BY,
    ORDER_DEFAULT_ORDER_DIRECTION,
    ORDER_DEFAULT_PERPAGE,
    ORDER_DEFAULT_STATUS,
} from 'src/order/constants/order.constant';
import {
    ENUM_DEPOSIT_TYPE,
    ENUM_ORDER_STATUS,
} from 'src/order/constants/order.enum';
import { PenaltyOrderDto } from 'src/order/dtos/penalty-order.dto';
import {
    OrderRequestDto,
    OrderUpdateStatusRequestDto,
} from 'src/order/dtos/request-order.dto';
import { UpdateOrderBasicDto } from 'src/order/dtos/update-order-basic.dto';
import { OrderDocument } from 'src/order/repositories/order.entity';
import { OrderService } from 'src/order/services/order.service';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { UserEntity } from 'src/user/repository/user.entity';

@ApiTags('modules.admin.orders')
@Controller({
    path: '/orders',
})
@ApiBearerAuth('accessToken')
export class OrderManageController {
    constructor(
        private readonly orderService: OrderService,
        private readonly paginationService: PaginationService,
        private readonly mailService: SendgridService,
        private readonly vnpayService: VNPayGatewayService,
        private readonly encryptService: HelperEncryptionService
    ) {}

    @ApiOperation({
        summary: 'Get all orders',
        description: 'Get all orders',
    })
    @AuthJwtAdminAccessProtected()
    @Get('/list')
    async getAllOrders(
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
        @PaginationQueryFilterDate('returnDate')
        returnDate: Record<string, any>,
        @PaginationQueryFilterInEnum<ENUM_ORDER_STATUS[]>(
            'status',
            ORDER_DEFAULT_STATUS,
            ENUM_ORDER_STATUS
        )
        _status: Record<string, any>,
        @PaginationQueryFilterInEnum<ENUM_DEPOSIT_TYPE[]>(
            'depositType',
            ORDER_DEFAULT_DEPOSIT_TYPE,
            ENUM_DEPOSIT_TYPE
        )
        _depositType: Record<string, any>
    ): Promise<any> {
        const find: Record<string, any> = {
            ..._search,
            ...rentalDate,
            ...returnDate,
            ..._depositType,
            ..._status,
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

    @Put('/detail/:id')
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(OrderRequestDto)
    @ApiOperation({
        tags: ['admin', 'order'],
        description:
            'Update order details, including payment, location, date,\n Cannot change cart details',

        summary: 'Update order basic details',
    })
    async updateOrderDetails(
        @Param('id') id: string,
        @Body() orderRequestDto: UpdateOrderBasicDto
    ) {
        const order = await this.orderService.findOneById(id);
        if (!order) {
            throw new NotFoundException('Order not found');
        }

        const {
            pickupLocation,
            rentalDate,
            returnDate,
            returnLocation,
            depositType,
        } = orderRequestDto;

        if (!this.validateUpdateOrderDetails(orderRequestDto, order)) {
            return;
        }

        rentalDate && (order.rentalDate = rentalDate);
        returnDate && (order.returnDate = returnDate);
        pickupLocation && (order.pickupLocation = pickupLocation);
        returnLocation && (order.returnLocation = returnLocation);
        depositType && (order.depositType = depositType);

        return order.save();
    }

    @ApiOperation({
        summary: 'Penalty an order',
        description: `If user return book late or damage book, penalty them. This will update order status to ${ENUM_ORDER_STATUS.RETURNED}`,
    })
    @AuthJwtAdminAccessProtected()
    @Put('/penalty/:id')
    @RequestParamGuard(OrderRequestDto)
    async penalty(
        @Param('id') orderId: string,
        @Body() dto: PenaltyOrderDto,
        @Ip() ip
    ) {
        const { penalty, penaltyReason } = dto;
        const order = await this.orderService.findOneById(orderId, {
            join: {
                path: 'userId',
                model: UserEntity.name,
                select: 'userName fullName email',
            },
        });
        if (!order) {
            throw new NotFoundException('Order not found');
        }

        if (penalty > order.totalPrice) {
            throw new BadRequestException(
                'Penalty cannot be greater than total price'
            );
        }

        order.penalty = penalty;
        order.penaltyReason = penaltyReason;
        // console.log(order);
        // order.status = ENUM_ORDER_STATUS.RETURNED;
        const paymentLink = await this.vnpayService.createPaymentLink({
            amount: dto.penalty,
            ipAddr: ip,
            locale: ENUM_LOCALE.VN,
            orderInfo: this.encryptService.base64Encrypt(orderId),
            returnUrl: dto.returnUrl,
        });
        console.log(paymentLink);
        this.mailService.sendPenantyEmail(
            { order, paymentLink },
            'phuoctungpbc02@gmail.com'
            // order.userId.email
        );

        return order.save();
    }

    @Put(':id/:status')
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(OrderUpdateStatusRequestDto)
    @ApiOperation({
        tags: ['admin', 'order'],
        description: 'Update order status',
        summary: 'Update order status',
    })
    async updateOrderStatus(
        @Param('id') id: string,
        @Param('status') status: ENUM_ORDER_STATUS
    ) {
        const order = await this.orderService.findOneById(id);
        if (!order) {
            throw new NotFoundException('Order not found');
        }

        order.status = status;

        return order.save();
    }
    @ApiOperation({
        summary: 'Get order details by id',
        description: 'Query order details by id',
    })
    @AuthJwtAccessProtected()
    @RequestParamGuard(OrderRequestDto)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<OrderDocument> {
        const order = await this.orderService.findOneById(id);
        if (!order) {
            throw new NotFoundException('Order not found');
        }

        return this.orderService.findOneById(id);
    }

    validateUpdateOrderDetails(
        orderRequestDto: UpdateOrderBasicDto,
        order: OrderDocument
    ) {
        const { rentalDate, returnDate } = orderRequestDto;

        if (rentalDate && rentalDate) {
            if (rentalDate < order.rentalDate) {
                throw new BadRequestException(
                    'Rental date cannot be set to a date before the current rental date'
                );
            }
        }

        if (rentalDate && rentalDate > order.returnDate) {
            throw new BadRequestException(
                'Rental date cannot be set to a date after the current return date'
            );
        }

        if (returnDate && returnDate < order.rentalDate) {
            throw new BadRequestException(
                'Return date cannot be set to a date before the current rental date'
            );
        }

        return true;
    }
}
