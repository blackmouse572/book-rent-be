import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from 'src/book/book.module';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constraint';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { ReviewController } from 'src/review/controllers/review.controller';
import {
    ReviewEntity,
    ReviewSchema,
} from 'src/review/repository/review.entity';
import { ReviewRepository } from 'src/review/repository/review.repository';
import { ReviewService } from 'src/review/services/review.service';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [ReviewController],
    providers: [ReviewRepository, ReviewService],
    exports: [],
    imports: [
        PaginationModule,
        HelpersModule,
        MongooseModule.forFeature(
            [
                {
                    name: ReviewEntity.name,
                    schema: ReviewSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
        BookModule,
        UserModule,
    ],
})
export class ReviewModule {}
