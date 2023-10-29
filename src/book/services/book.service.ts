import { Injectable, NotFoundException } from '@nestjs/common';
import { BOOK_STATUS_ENUM } from 'src/book/constants/book.enum.constants';
import { CreateBookDto } from 'src/book/dtos/create-book.dto';
import { UpdateBookDto } from 'src/book/dtos/update-book.dto';
import { BookDoc, BookEntity } from 'src/book/repository/book.entity';
import { BookRepository } from 'src/book/repository/book.repository';
import { CategoryDoc } from 'src/category/repository/category.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly cloudinarySercive: CloudinaryService
    ) {}
    async update(
        bookDoc: BookDoc,
        dto: UpdateBookDto,
        categorys: CategoryDoc[],
        file: Express.Multer.File,
        options?: IDatabaseManyOptions<any>
    ): Promise<BookDoc> {
        if (file) {
            const infor = await this.cloudinarySercive.uploadFile(file);
            bookDoc.image = infor.secure_url;
        }

        bookDoc.author ??= dto.author;
        bookDoc.name ??= dto.name;
        bookDoc.category ??= categorys;
        bookDoc.description ??= dto.description;
        bookDoc.genres ??= dto.genres;
        bookDoc.keyword ??= dto.keyword;
        bookDoc.name ??= dto.name;
        bookDoc.rental_price ??= dto.rental_price;
        bookDoc.status ??= dto.status;
        return this.bookRepository.save(bookDoc, options);
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<BookEntity[]> {
        return this.bookRepository.findAll<BookEntity>(find, {
            ...options,
            join: true,
        });
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<BookDoc> {
        return this.bookRepository.findOneById<BookDoc>(_id, options);
    }

    async findOne(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<BookDoc> {
        return this.bookRepository.findOne<BookDoc>(find, options);
    }
    findOneByKeyword(
        keyword: string,
        options?: IDatabaseFindOneOptions<any>
    ): Promise<BookDoc> {
        return this.bookRepository.findOne({ keyword }, options);
    }
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.bookRepository.getTotal(find, { ...options, join: true });
    }
    async create(
        dto: CreateBookDto,
        categorys: CategoryDoc[],
        file: Express.Multer.File,
        options?: IDatabaseCreateOptions<any>
    ): Promise<BookDoc> {
        const entity = new BookEntity();

        const infor = await this.cloudinarySercive.uploadFile(file);
        entity.image = infor.secure_url;

        entity.author = dto.author;
        entity.category = categorys;
        entity.genres = dto.genres || [];
        entity.description = dto.description;
        entity.keyword = dto.keyword;
        entity.name = dto.name;
        entity.rental_price = dto.rental_price;
        entity.status = BOOK_STATUS_ENUM.ENABLE;

        return await this.bookRepository.create(entity, options);
    }

    async delete(id: string, options?: IDatabaseSaveOptions): Promise<BookDoc> {
        const book: BookDoc = await this.findOneById(id);
        if (!book) {
            throw new NotFoundException({ message: 'book not found' });
        }
        return this.bookRepository.softDelete(book, options);
    }
    active(
        repository: BookDoc,
        options?: IDatabaseSaveOptions
    ): Promise<BookDoc> {
        repository.status = BOOK_STATUS_ENUM.ENABLE;
        return this.bookRepository.save(repository, options);
    }
    inactive(
        repository: BookDoc,
        options?: IDatabaseSaveOptions
    ): Promise<BookDoc> {
        repository.status = BOOK_STATUS_ENUM.DISABLE;
        return this.bookRepository.save(repository, options);
    }

    deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        return this.bookRepository.deleteMany(find, options);
    }
}
