import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from 'src/category/controller/category.controller'; // Add your CategoryController import
import {
    CategoryEntity,
    CategorySchema,
} from 'src/category/repository/category.entity';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { CategoryService } from 'src/category/services/category.service';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constraint';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'; // Add if you need cloudinary functionalities in CategoryModule

@Module({
    controllers: [CategoryController], // Added CategoryController to controllers
    providers: [CategoryService, CategoryRepository],
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
        CloudinaryModule,
    ],
})
export class CategoryModule {}
