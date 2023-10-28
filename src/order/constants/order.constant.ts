import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/constants/pagination.enum.constant';
import {
    ENUM_DEPOSIT_TYPE,
    ENUM_ORDER_STATUS,
} from 'src/order/constants/order.enum';

export const ORDER_DEFAULT_PERPAGE = 20;
export const ORDER_DEFAULT_ORDER_BY = 'createdAt';
export const ORDER_DEFAULT_ORDER_DIRECTION =
    ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
export const ORDER_DEFAULT_AVAILABLE_ORDER_BY = [
    'createdAt',
    'updatedAt',
    'rentalDate',
    'returnDate',
    'status',
    'depositType',
];
export const ORDER_DEFAULT_AVAILABLE_SEARCH = [
    'pickupLocation',
    'returnLocation',
];

export const ORDER_DEFAULT_STATUS = Object.values(ENUM_ORDER_STATUS);
export const ORDER_DEFAULT_DEPOSIT_TYPE = Object.values(ENUM_DEPOSIT_TYPE);
