import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    CategoryEntity,
    CategorySchema,
} from 'src/category/repository/category.entity';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { CategoryService } from 'src/category/services/category.service';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constraint';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
    controllers: [],
    providers: [CategoryRepository, CategoryService],
    exports: [CategoryService],
    imports: [
        PaginationModule,
        HelpersModule,
        MongooseModule.forFeature(
            [
                {
                    name: CategoryEntity.name,
                    schema: CategorySchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class CategoryModule {}
