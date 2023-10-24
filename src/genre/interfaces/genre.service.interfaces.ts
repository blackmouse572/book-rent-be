import { GenreDoc, GenreEntity } from 'src/genre/repository/genre.entity';
import {
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';

export interface IGenreService {
    // Retrieve all genres, possibly with some filtering or pagination
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<GenreEntity[]>;

    // Retrieve a single genre by its ID
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc>;

    // Retrieve a single genre based on some criteria
    findOne(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc>;

    // Get the total number of genres, possibly with some filtering
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number>;

    // Update an existing genre by its ID
    update(
        _id: string,
        updateGenreDto: {
            name?: string;
            bookQuantity?: number;
            books?: string[]; // Assuming the books are represented by their IDs
            bookNames?: string[];
        },
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc>;
}
