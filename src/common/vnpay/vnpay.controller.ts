import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePaymentLink } from 'src/common/vnpay/dto/create-payment-link.dto';
import { VNPayGatewayService } from 'src/common/vnpay/services/vnpay-gateway.service';

@ApiTags('modules.payment')
@Controller('/vnpay')
export class VNPayController {
    constructor(private readonly vnGatewayService: VNPayGatewayService) {}

    @ApiOperation({
        summary: 'Create a payment url',
        description: 'Return a VNPay Url ',
    })
    @Post('/')
    async getPaymentLink(@Body() payload: CreatePaymentLink) {
        const url = await this.vnGatewayService.processPayment(payload);

        return url;
    }
}
