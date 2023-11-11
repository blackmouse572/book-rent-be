import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as autopopulate from 'mongoose-autopopulate';
import { BookModule } from 'src/book/book.module';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constraint';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { VNPayModule } from 'src/common/vnpay/vnpay.module';
import { OrderController } from 'src/order/controllers/order.controller';
import { OrderManageController } from 'src/order/controllers/order.manage.controller';
import {
    OrderCartEntity,
    OrderCartSchema,
} from 'src/order/repositories/order-cart.enity';
import { OrderCartRepository } from 'src/order/repositories/order-cart.repository';
import { OrderEntity, OrderSchema } from 'src/order/repositories/order.entity';
import { OrderRepository } from 'src/order/repositories/order.repository';
import { OrderCartService } from 'src/order/services/order-cart.service';
import { OrderService } from 'src/order/services/order.service';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [OrderManageController, OrderController],
    providers: [
        OrderService,
        OrderRepository,
        OrderCartRepository,
        OrderCartService,
    ],
    exports: [OrderService],
    imports: [
        MongooseModule.forFeatureAsync(
            [
                {
                    name: OrderEntity.name,
                    useFactory: () => {
                        const schema = OrderSchema;
                        schema.plugin(autopopulate.default);
                        return schema;
                    },
                },
                {
                    name: OrderCartEntity.name,
                    useFactory: () => {
                        const schema = OrderCartSchema;
                        schema.plugin(autopopulate.default);
                        return schema;
                    },
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
        BookModule,
        PaginationModule,
        HelpersModule,
        UserModule,
        VNPayModule,
    ],
})
export class OrderModule {}
