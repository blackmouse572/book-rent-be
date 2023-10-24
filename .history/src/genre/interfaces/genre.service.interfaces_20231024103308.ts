import { GenreDoc, GenreEntity } from 'src/genre/repository/genre.entity';
import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
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

    // Create a new genre
    create(
        name: string, // Assuming the simplest case where a genre might just have a name
        options?: IDatabaseCreateOptions
    ): Promise<GenreDoc>;

    // Update an existing genre by its ID
    update(
        _id: string,
        name: string, // Again, assuming the simplest case
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc>;

    // Delete multiple genres based on some criteria
    deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean>;
}
