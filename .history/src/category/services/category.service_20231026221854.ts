import { Injectable, NotFoundException } from '@nestjs/common';
import { CATEGORY_STATUS_ENUM } from 'src/category/constants/category.enum.constants';
import { CategoryCreateDto } from 'src/category/dtos/create-category.dto';
import { CategoryUpdateDto } from 'src/category/dtos/update-category.dto';
import {
    CategoryDoc,
    CategoryEntity,
} from 'src/category/repository/category.entity';
import { CategoryRepository } from 'src/category/repository/category.repository';
import {
    IDatabaseCreateOptions,
    IDatabaseFindOneOptions,
    IDatabaseFindAllOptions,
} from 'src/common/database/interfaces/database.interface';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<CategoryDoc> {
        return this.categoryRepository.findOneById<CategoryDoc>(_id, options);
    }

    async create(
        categoryCreateDto: CategoryCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<CategoryDoc> {
        const entity: CategoryEntity = new CategoryEntity();
        entity.name = categoryCreateDto.name;
        entity.description = categoryCreateDto.description;
        entity.status = CATEGORY_STATUS_ENUM.ENABLE;

        return this.categoryRepository.create<CategoryEntity>(entity, options);
    }

    async update(
        _id: string,
        categoryUpdateDto: CategoryUpdateDto
    ): Promise<CategoryDoc> {
        const category = await this.findOneById(_id);
        if (!category) {
            throw new NotFoundException({ message: 'Category not found' });
        }
        if (categoryUpdateDto.name) {
            category.name = categoryUpdateDto.name;
        }
        if (categoryUpdateDto.description) {
            category.description = categoryUpdateDto.description;
        }
        if (categoryUpdateDto.status) {
            category.status = categoryUpdateDto.status;
        }
        return this.categoryRepository.save(category); // Removed options for simplicity
    }

    async findAll(
        find: Record<string, any> = {},
        options?: IDatabaseFindAllOptions
    ): Promise<CategoryEntity[]> {
        return this.categoryRepository.findAll<CategoryEntity>(find, options);
    }

    async getTotal(find: Record<string, any> = {}): Promise<number> {
        return this.categoryRepository.count(find);
    }
}
