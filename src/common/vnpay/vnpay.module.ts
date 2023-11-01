import { Module } from '@nestjs/common';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { VNPayGatewayService } from 'src/common/vnpay/services/vnpay-gateway.service';

@Module({
    providers: [VNPayGatewayService],
    exports: [VNPayGatewayService],
    imports: [HelpersModule],
})
export class VNPayModule {}
