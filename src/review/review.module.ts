import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constraint';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import {
    ReviewEntity,
    ReviewSchema,
} from 'src/review/repository/review.entity';
import { ReviewRepository } from 'src/review/repository/review.repository';

@Module({
    controllers: [],
    providers: [ReviewRepository],
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
    ],
})
export class ReviewModule {}
