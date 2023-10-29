import { Injectable } from '@nestjs/common';
import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
} from 'src/common/database/interfaces/database.interface';
import { IOrderCartService } from 'src/order/interfaces/order-cart-service.interface';
import {
    OrderCartDocument,
    OrderCartEntity,
} from 'src/order/repositories/order-cart.enity';
import { OrderCartRepository } from 'src/order/repositories/order-cart.repository';

@Injectable()
export class OrderCartService implements IOrderCartService {
    constructor(private readonly orderCartRepository: OrderCartRepository) {}
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions<any>
    ): Promise<OrderCartEntity[]> {
        return this.orderCartRepository.findAll(find, options);
    }

    findOneById(_id: string): Promise<OrderCartDocument> {
        return this.orderCartRepository.findOneById(_id);
    }

    findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindAllOptions<any>
    ): Promise<T> {
        return this.orderCartRepository.findOne(find, options);
    }

    create(
        { book, quantity }: { book: string; quantity: number },
        options?: IDatabaseCreateOptions<any>
    ): Promise<OrderCartDocument> {
        return this.orderCartRepository.create(
            {
                book,
                quantity,
            },
            options
        );
    }

    async createMany(
        orderCarts: { book: string; quantity: number }[],
        options?: IDatabaseCreateOptions<any>
    ): Promise<OrderCartDocument[]> {
        const orderCartDocs = await Promise.all(
            orderCarts.map(async (orderCart) => {
                const { book, quantity } = orderCart;
                return await this.create(
                    {
                        book,
                        quantity,
                    },
                    options
                );
            })
        );

        return orderCartDocs;
    }
}
