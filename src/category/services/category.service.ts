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

    async enable(_id: string): Promise<CategoryDoc> {
        const category = await this.findOneById(_id);
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        category.status = CATEGORY_STATUS_ENUM.ENABLE;
        return this.categoryRepository.save(category);
    }

    async disable(_id: string): Promise<CategoryDoc> {
        const category = await this.findOneById(_id);
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        category.status = CATEGORY_STATUS_ENUM.DISABLE;
        return this.categoryRepository.save(category);
    }

    async changeStatus(_id: string): Promise<CategoryDoc> {
        const category = await this.findOneById(_id);
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        category.status =
            category.status === CATEGORY_STATUS_ENUM.ENABLE
                ? CATEGORY_STATUS_ENUM.DISABLE
                : CATEGORY_STATUS_ENUM.ENABLE;
        return this.categoryRepository.save(category);
    }

    async create(
        categoryCreateDto: CategoryCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<CategoryDoc> {
        const entity = new CategoryEntity();
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
            throw new NotFoundException('Category not found');
        }
        category.name = categoryUpdateDto.name ?? category.name;
        category.description =
            categoryUpdateDto.description ?? category.description;
        category.status = categoryUpdateDto.status ?? category.status;
        return this.categoryRepository.save(category);
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
    async updateStatus(
        _id: string,
        newStatus: CATEGORY_STATUS_ENUM
    ): Promise<CategoryDoc> {
        const category = await this.findOneById(_id);
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        category.status = newStatus;
        return this.categoryRepository.save(category);
    }
}
