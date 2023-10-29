import { Model } from 'mongoose';
import { DatabaseMongoObjectIdRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.object-id.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    OrderCartDocument,
    OrderCartEntity,
} from 'src/order/repositories/order-cart.enity';

export class OrderCartRepository extends DatabaseMongoObjectIdRepositoryAbstract<
    OrderCartEntity,
    OrderCartDocument
> {
    constructor(
        @DatabaseModel(OrderCartEntity.name)
        private readonly orderModel: Model<OrderCartEntity>
    ) {
        super(orderModel);
    }
}
