import { Injectable } from '@nestjs/common';
import {
    IDatabaseCreateOptions,
    IDatabaseFindOneOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { GenreCreateDto } from 'src/genre/dtos/create-genre.dto';
import { UpdateGenreDto } from 'src/genre/dtos/update-genre.dto';
import { GenreDoc, GenreEntity } from 'src/genre/repository/genre.entity';
import { GenreRepository } from 'src/genre/repository/genre.repository';

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

    // Assuming you want to fetch all genres with their associated books
    async findAllWithBooks(find?: any, options?: any): Promise<GenreEntity[]> {
        // This method will require implementation in the repository to fetch genres with their associated books
        return this.genreRepository.findAllWithBooks(find, options);
    }

    async getTotal(find?: any): Promise<number> {
        // This method will require implementation in the repository to get the total count of genres
        return this.genreRepository.getTotal(find);
    }
}
