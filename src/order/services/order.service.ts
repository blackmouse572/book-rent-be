import { Injectable } from '@nestjs/common';
import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
} from 'src/common/database/interfaces/database.interface';
import { ENUM_ORDER_STATUS } from 'src/order/constants/order.enum';
import { CreateOrderDTO, PlaceOrderDto } from 'src/order/dtos/create-order.dto';
import { IOrderService } from 'src/order/interfaces/order-service.interface';
import {
    OrderDocument,
    OrderEntity,
} from 'src/order/repositories/order.entity';
import { OrderRepository } from 'src/order/repositories/order.repository';

@Injectable()
export class OrderService implements IOrderService {
    constructor(private readonly orderRepository: OrderRepository) {}
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<OrderEntity[]> {
        return this.orderRepository.findAll<OrderEntity>(find, {
            ...options,
            join: true,
        });
    }
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions<any>
    ): Promise<OrderDocument> {
        return this.orderRepository.findOneById(_id, options);
    }
    findOne<OrderDocument>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions<any>
    ): Promise<OrderDocument> {
        return this.orderRepository.findOne<OrderDocument>(find, options);
    }
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.orderRepository.getTotal(find, options);
    }

    create(
        {
            pickupLocation,
            quantity,
            rentalDate,
            returnDate,
            returnLocation,
            depositType,
            bookId,
        }: PlaceOrderDto,
        userId: string,
        totalPrice: number,
        options?: IDatabaseCreateOptions
    ): Promise<OrderDocument> {
        return this.orderRepository.create<CreateOrderDTO>(
            {
                bookId,
                pickupLocation,
                depositType,
                quantity,
                rentalDate,
                returnDate,
                returnLocation,
                status: ENUM_ORDER_STATUS.PENDING,
                totalPrice,
                userId,
            },
            options
        );
    }
}
