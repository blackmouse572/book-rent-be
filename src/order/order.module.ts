import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as autopopulate from 'mongoose-autopopulate';
import { BookModule } from 'src/book/book.module';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constraint';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { OrderController } from 'src/order/controllers/order.controller';
import { OrderEntity, OrderSchema } from 'src/order/repositories/order.entity';
import { OrderRepository } from 'src/order/repositories/order.repository';
import { OrderService } from 'src/order/services/order.service';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
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
            ],
            DATABASE_CONNECTION_NAME
        ),
        BookModule,
        PaginationModule,
        HelpersModule,
        UserModule,
    ],
})
export class OrderModule {}
