import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { SendgridRRepository } from 'src/sendgrid/sendgrid.repository';

@Module({
    providers: [SendgridService, SendgridRRepository],
    exports: [SendgridService],
})
export class SendgridModule {}
