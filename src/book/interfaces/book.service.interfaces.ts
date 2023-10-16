import { BookCreateDto } from 'src/book/dtos/create-book.dto';
import { BookDoc, BookEntity } from 'src/book/repository/book.entity';
import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';

export interface IBookService {
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<BookEntity[]>;
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<BookDoc>;
    findOne(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<BookDoc>;
    findOneByKeyword(
        keyword: string,
        options?: IDatabaseFindOneOptions
    ): Promise<BookDoc>;
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number>;
    create(
        dto: BookCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<BookDoc>;
    delete(
        repository: BookDoc,
        options?: IDatabaseSaveOptions
    ): Promise<BookDoc>;
    active(
        repository: BookDoc,
        options?: IDatabaseSaveOptions
    ): Promise<BookDoc>;
    inactive(
        repository: BookDoc,
        options?: IDatabaseSaveOptions
    ): Promise<BookDoc>;
    deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean>;
}
