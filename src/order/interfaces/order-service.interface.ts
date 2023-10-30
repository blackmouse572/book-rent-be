import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
} from 'src/common/database/interfaces/database.interface';
import { PlaceOrderDto } from 'src/order/dtos/create-order.dto';
import { OrderCartEntity } from 'src/order/repositories/order-cart.enity';
import {
    OrderDocument,
    OrderEntity,
} from 'src/order/repositories/order.entity';

export interface IOrderService {
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<OrderEntity[]>;
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<OrderDocument>;
    findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T>;
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number>;
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
    ): Promise<OrderDocument>;
}
