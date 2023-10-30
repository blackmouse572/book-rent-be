import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { VNPayPayload } from 'src/common/vnpay/interfaces/vnpay.interface';

@Injectable()
export class VNPayGatewayService {
    private readonly clientService: AxiosInstance;
    private readonly hashCode: string;
    private readonly tmpCode: string;
    constructor(private readonly configService: ConfigService) {
        this.clientService = axios.create({
            baseURL: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
        });
        this.hashCode = this.configService.get('vnpay.hashSecure');
        this.tmpCode = this.configService.get('vnpay.tmpCode');
    }

    async createPaymentLink(
        params: Omit<
            VNPayPayload,
            | 'vnp_Version'
            | 'vnp_SecureHash'
            | 'vnp_CreateDate'
            | 'vnp_TmnCode'
            | 'vnp_Command'
        >
    ) {
        const vnp_Command = 'pay';
        const vnp_CreateDate = Date.now();

        const res = await this.clientService.get('', {
            params: {
                ...params,
                vnp_Command,
                vnp_CreateDate,
                vnp_TmnCode: this.tmpCode,
            },
        });

        return res.data;
    }
}
