import { Injectable, NotFoundException } from '@nestjs/common';
import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { GenreCreateDto } from 'src/genre/dtos/create-genre.dto';
import { UpdateGenreDto } from 'src/genre/dtos/update-genre.dto';
import { GenreDoc, GenreEntity } from 'src/genre/repository/genre.entity';
import { GenreRepository } from 'src/genre/repository/genre.repository';
import { }
@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options);
    }

    async create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options);
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (!genre) {
            throw new NotFoundException({ message: 'Genre not found' });
        }
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options);
    }

    async findAllWithBooks(
        find?: any,
        options?: IDatabaseFindAllOptions
    ): Promise<GenreEntity[]> {
        return this.genreRepository.findAll<GenreEntity>(find, options);
    }

    async getTotal(
        find?: any,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.genreRepository.getTotal(find, options);
    }
}
