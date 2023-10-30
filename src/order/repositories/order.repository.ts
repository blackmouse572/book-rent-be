import { Model } from 'mongoose';
import { DatabaseMongoObjectIdRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.object-id.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    OrderDocument,
    OrderEntity,
} from 'src/order/repositories/order.entity';

export class OrderRepository extends DatabaseMongoObjectIdRepositoryAbstract<
    OrderEntity,
    OrderDocument
> {
    constructor(
        @DatabaseModel(OrderEntity.name)
        private readonly orderModel: Model<OrderEntity>
    ) {
        super(orderModel);
    }
}
