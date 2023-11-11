import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constraint';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { VNPayModule } from 'src/common/vnpay/vnpay.module';
import { OrderModule } from 'src/order/order.module';
import { TransactionController } from 'src/transaction/controllers/transaction.controller';
import { TransactionRepository } from 'src/transaction/repository/transaction.repository';
import {
    TransactionEntity,
    TransactionSchema,
} from 'src/transaction/repository/transaction.entity';
import { TransactionService } from 'src/transaction/services/transaction.service';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [TransactionController],
    providers: [TransactionService, TransactionRepository],
    exports: [TransactionService],
    imports: [
        PaginationModule,
        HelpersModule,
        MongooseModule.forFeature(
            [
                {
                    name: TransactionEntity.name,
                    schema: TransactionSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
        OrderModule,
        VNPayModule,
        UserModule,
    ],
})
export class TransactionModule {}
