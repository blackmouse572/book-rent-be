import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CATEGORY_STATUS_ENUM } from 'src/category/constants/category.enum.constants';
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
        private readonly categoryService: CategoryService,
        private readonly paginationService: PaginationService
    ) {}

    @ApiOperation({ tags: ['category'], description: 'create category' })
    @AuthJwtAdminAccessProtected()
    @Post()
    async create(
        @Body() createCategoryDto: CategoryCreateDto
    ): Promise<CategoryDoc> {
        return this.categoryService.create(createCategoryDto);
    }

    @ApiOperation({
        tags: ['category'],
        description: 'get category by id or get all categories',
    })
    @Get('/:id?')
    async findByIdOrFindAll(
        @Param('id') _id?: string
    ): Promise<CategoryDoc | CategoryEntity[]> {
        if (_id) {
            const result = await this.categoryService.findOneById(_id);
            if (!result) {
                throw new NotFoundException({ message: 'category not found' });
            }
            return result;
        } else {
            return this.categoryService.findAll();
        }
    }

    @ApiOperation({
        tags: ['category'],
        description: 'Get a list of all categories with pagination',
    })
    @Get('/list')
    async listCategories(
        @PaginationQuery(
            CATEGORY_PAGINATION_DEFAULT_LIMIT,
            CATEGORY_PAGINATION_DEFAULT_SORT_FIELD,
            CATEGORY_PAGINATION_DEFAULT_SORT_DIRECTION,
            undefined,
            CATEGORY_PAGINATION_ALLOWED_SORT_FIELDS
        )
        paginationDto: PaginationListDto,
        @Query('status') status?: CATEGORY_STATUS_ENUM
    ): Promise<{ _pagination: any; data: CategoryEntity[] }> {
        const { _limit, _order, _offset, _search } = paginationDto;
        const find: Record<string, any> = {
            ..._search,
            ...(status ? { status } : {}),
        };

        const categories = await this.categoryService.findAll(find, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
        });

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
    @ApiOperation({ summary: 'Update the status of a category' })
    @AuthJwtAdminAccessProtected()
    @Put('status/:id')
    async updateStatus(
        @Param('id') id: string,
        @Body() updateStatusDto: { status: CATEGORY_STATUS_ENUM }
    ): Promise<CategoryDoc> {
        return this.categoryService.updateStatus(id, updateStatusDto.status);
    }
}
