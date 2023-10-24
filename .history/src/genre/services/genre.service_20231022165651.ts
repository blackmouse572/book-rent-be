import { Injectable } from '@nestjs/common';
import {
    IDatabaseCreateOptions,
    IDatabaseFindOneOptions,
} from 'src/common/database/interfaces/database.interface';
import { GenreCreateDto } from 'src/genre/dtos/create-genre.dto';
import { GenreDoc, GenreEntity } from 'src/genre/repository/genre.entity';
import { GenreRepository } from 'src/genre/repository/genre.repository';

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById<GenreDoc>(_id, options);
    }
    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.quantity = genreDto.quantity;

        return this.genreRepository.create<GenreEntity>(entity, options);
    }
}
