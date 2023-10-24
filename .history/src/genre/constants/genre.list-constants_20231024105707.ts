import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/constants/pagination.enum.constant';

export const GENRE_PAGINATION_DEFAULT_LIMIT = 20;
export const GENRE_PAGINATION_DEFAULT_SORT_FIELD = 'name'; // Default sorting by genre name
export const GENRE_PAGINATION_DEFAULT_SORT_DIRECTION = ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
export const GENRE_PAGINATION_ALLOWED_SORT_FIELDS = [
    'name', // Allow sorting by genre name
    'bookQuantity',   // Allow sorting by the number of books
];
