import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constraint';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { GenreEntity, GenreSchema } from 'src/genre/repository/genre.entity';
import { GenreRepository } from 'src/genre/repository/genre.repository';
import { GenreService } from 'src/genre/services/genre.service';

@Module({
    controllers: [],
    providers: [GenreRepository, GenreService],
    exports: [GenreService],
    imports: [
        PaginationModule,
        HelpersModule,
        MongooseModule.forFeature(
            [
                {
                    name: GenreEntity.name,
                    schema: GenreSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class GenreModule {}
