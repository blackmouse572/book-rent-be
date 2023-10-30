import { Module } from '@nestjs/common';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { VNPayGatewayService } from 'src/common/vnpay/services/vnpay-gateway.service';
import { VNPayController } from 'src/common/vnpay/vnpay.controller';

@Module({
    providers: [VNPayGatewayService],
    exports: [VNPayGatewayService],
    controllers: [VNPayController],
    imports: [HelpersModule],
})
export class VNPayModule {}
