import { registerAs } from '@nestjs/config';

export default registerAs(
    'vnpay',
    (): Record<string, any> => ({
        hashSecure: process.env.VNPAY_HASHSECRET ?? 'ack',
        tmpCode: process.env.VNPAY_TMNCODE ?? 'ack',
    })
);
