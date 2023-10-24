import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from 'src/book/controllers/book.controller';
import { BookEntity, BookSchema } from 'src/book/repository/book.entity';
import { BookRepository } from 'src/book/repository/book.repository';
import { BookService } from 'src/book/services/book.service';
import { CategoryModule } from 'src/category/category.module';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constraint';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { GenreModule } from 'src/genre/genre.module';

@Module({
    controllers: [BookController],
    providers: [BookService, BookRepository],
    exports: [BookService],
    imports: [
        PaginationModule,
        HelpersModule,
        MongooseModule.forFeature(
            [
                {
                    name: BookEntity.name,
                    schema: BookSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
        GenreModule,
        CategoryModule,
    ],
})
export class BookModule {}
