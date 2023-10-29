import { Injectable } from '@nestjs/common';
import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
} from 'src/common/database/interfaces/database.interface';
import { ENUM_ORDER_STATUS } from 'src/order/constants/order.enum';
import { PlaceOrderDto } from 'src/order/dtos/create-order.dto';
import { IOrderService } from 'src/order/interfaces/order-service.interface';
import { OrderCartEntity } from 'src/order/repositories/order-cart.enity';
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
            rentalDate,
            returnDate,
            returnLocation,
            depositType,
        }: PlaceOrderDto,
        cart: OrderCartEntity[],
        userId: string,
        totalPrice: number,
        options?: IDatabaseCreateOptions
    ): Promise<OrderDocument> {
        return this.orderRepository.create(
            {
                pickupLocation,
                depositType,
                rentalDate,
                returnDate,
                returnLocation,
                totalPrice,
                userId,
                status: ENUM_ORDER_STATUS.PENDING,
                cart: cart.map((orderCart) => orderCart._id),
            },
            options
        );
    }

    save(
        order: OrderDocument,
        options?: IDatabaseCreateOptions
    ): Promise<OrderDocument> {
        return this.orderRepository.save(order, options);
    }
}
