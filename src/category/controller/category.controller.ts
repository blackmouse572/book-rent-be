import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthJwtAdminAccessProtected } from 'src/auth/decorators/auth.jwt.decorator';
import { CategoryCreateDto } from 'src/category/dtos/create-category.dto';
import { CategoryUpdateDto } from 'src/category/dtos/update-category.dto';
import {
    CategoryDoc,
    CategoryEntity,
} from 'src/category/repository/category.entity';
import { CategoryService } from 'src/category/services/category.service';
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dto/pagination.list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import {
    CATEGORY_PAGINATION_DEFAULT_LIMIT,
    CATEGORY_PAGINATION_DEFAULT_SORT_FIELD,
    CATEGORY_PAGINATION_DEFAULT_SORT_DIRECTION,
    CATEGORY_PAGINATION_ALLOWED_SORT_FIELDS,
} from 'src/category/constants/category.list-constants';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly categoryService: CategoryService
    ) {}

    @ApiOperation({
        tags: ['category'],
        description: 'create category',
    })
    @AuthJwtAdminAccessProtected()
    @Post()
    async create(
        @Body() createCategoryDto: CategoryCreateDto
    ): Promise<CategoryDoc> {
        return this.categoryService.create(createCategoryDto);
    }

    @ApiOperation({
        tags: ['category'],
        description: 'get category by id',
    })
    @Get('/:id')
    async getById(@Param('id') _id: string): Promise<CategoryDoc> {
        const result = await this.categoryService.findOneById(_id);
        if (!result) {
            throw new NotFoundException({ message: 'category not found' });
        }
        return result;
    }

    @ApiOperation({
        tags: ['category'],
        description: 'get all categories',
    })
    @Get()
    async findAll(): Promise<CategoryEntity[]> {
        return this.categoryService.findAll();
    }

    @ApiOperation({
        tags: ['category'],
        description: 'update category by Id',
    })
    @AuthJwtAdminAccessProtected()
    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() updateCategoryDto: CategoryUpdateDto
    ): Promise<CategoryDoc> {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @ApiOperation({
        tags: ['admin', 'user'],
        description: 'Get list of categories in database',
    })
    @AuthJwtAdminAccessProtected()
    @Get('/list')
    async list(
        @PaginationQuery(
            CATEGORY_PAGINATION_DEFAULT_LIMIT,
            CATEGORY_PAGINATION_DEFAULT_SORT_FIELD,
            CATEGORY_PAGINATION_DEFAULT_SORT_DIRECTION,
            undefined,
            CATEGORY_PAGINATION_ALLOWED_SORT_FIELDS
        )
        paginationDto: PaginationListDto
    ) {
        const _limit = paginationDto._limit;
        const _order = paginationDto._order;
        const find: Record<string, any> = {
            ...paginationDto._search,
        };

        const categories: CategoryEntity[] = await this.categoryService.findAll(
            find,
            {
                paging: {
                    limit: _limit,
                    offset: paginationDto._offset,
                },
                order: _order,
            }
        );

        const total: number = await this.categoryService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage },
            data: categories,
        };
    }
}
