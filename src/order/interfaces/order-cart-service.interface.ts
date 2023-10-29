import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
} from 'src/common/database/interfaces/database.interface';
import {
    OrderCartDocument,
    OrderCartEntity,
} from 'src/order/repositories/order-cart.enity';

export interface IOrderCartService {
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<OrderCartEntity[]>;
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<OrderCartDocument>;
    findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T>;
    create(
        {
            book,
            quantity,
        }: {
            book: string;
            quantity: number;
        },
        options?: IDatabaseCreateOptions
    ): Promise<OrderCartDocument>;

    createMany(
        orderCarts: {
            book: string;
            quantity: number;
        }[],
        options?: IDatabaseCreateOptions
    ): Promise<OrderCartDocument[]>;
}
