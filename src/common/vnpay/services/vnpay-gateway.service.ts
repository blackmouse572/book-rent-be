import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { nanoid } from 'nanoid';
import { ENUM_HELPER_DATE_FORMAT } from 'src/common/helpers/constants/helper.enum.constant';
import { HelperDateService } from 'src/common/helpers/services/helper.date.service';
import { CreatePaymentLink } from 'src/common/vnpay/dto/create-payment-link.dto';
import { VNPay } from 'vn-payments';
import qs from 'qs';
import { HelperHashService } from 'src/common/helpers/services/helper.hash.service';

@Injectable()
export class VNPayGatewayService {
    private readonly clientService: AxiosInstance;
    private readonly vnpay: VNPay;
    private readonly hashSecret: string;
    private readonly tmpCode: string;
    private readonly paymentGateway: string =
        'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

    constructor(
        private readonly configService: ConfigService,
        private readonly dateHelper: HelperDateService,
        private readonly hashHelper: HelperHashService
    ) {
        this.clientService = axios.create({
            baseURL: this.paymentGateway,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.hashSecret = this.configService.get('vnpay.hashSecure');
        this.tmpCode = this.configService.get('vnpay.tmpCode');

        this.vnpay = new VNPay({
            merchant: this.tmpCode,
            paymentGateway: this.paymentGateway,
            secureSecret: this.hashSecret,
        });
    }

    async createPaymentLink(params: CreatePaymentLink) {
        const { amount, ipAddr, locale, orderInfo, returnUrl } = params;

        const createDate = new Date(Date.now());
        const expireDate = this.dateHelper.forwardInDays(1, {
            fromDate: createDate,
        });

        const createDateStr = this.dateHelper.format(createDate, {
            format: ENUM_HELPER_DATE_FORMAT.LONG_STRING_DATE_TIME,
        });
        const expireDateStr = this.dateHelper.format(expireDate, {
            format: ENUM_HELPER_DATE_FORMAT.LONG_STRING_DATE_TIME,
        });

        let payParams = {};

        payParams['vnp_Amount'] = amount * 100;
        payParams['vnp_Command'] = 'pay';
        payParams['vnp_CreateDate'] = createDateStr;
        payParams['vnp_CurrCode'] = 'VND';
        payParams['vnp_ExpireDate'] = expireDateStr;
        payParams['vnp_IpAddr'] = ipAddr;
        payParams['vnp_Locale'] = locale;
        payParams['vnp_OrderInfo'] = orderInfo;
        payParams['vnp_OrderType'] = 'other';
        payParams['vpn_ReturnUrl'] = returnUrl;
        payParams['vnp_TmnCode'] = this.tmpCode;
        payParams['vnp_TxnRef'] = nanoid();
        payParams['vnp_Version'] = '2.1.0';

        payParams = this.sortObject(payParams);
        const signData = qs.stringify(payParams, {
            encode: false,
        });
        const signedValue = this.hashHelper.signHMACSHA512(
            signData,
            this.hashSecret
        );

        payParams['vnp_SecureHash'] = signedValue;

        const finalUrl =
            this.paymentGateway +
            '?' +
            qs.stringify(payParams, { encode: false });

        return finalUrl;
    }

    async processPayment(data: CreatePaymentLink) {
        const { amount, ipAddr, locale, orderInfo, returnUrl } = data;
        return this.vnpay.buildCheckoutUrl({
            amount,
            clientIp: ipAddr,
            currency: 'VND',
            locale,
            orderId: nanoid(),
            orderInfo,
            orderType: 'fashion',
            returnUrl,
            transactionId: nanoid(),
            vnpSecretKey: this.hashSecret,
            vnpMerchant: this.tmpCode,
            vnpCommand: 'pay',
            vnpVersion: '2',
            paymentGateway: this.paymentGateway,
            merchant: this.tmpCode,
            secureSecret: this.hashSecret,
        });
    }

    sortObject(obj: any): any {
        const sorted = {};
        const str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
                /%20/g,
                '+'
            );
        }
        return sorted;
    }
}
