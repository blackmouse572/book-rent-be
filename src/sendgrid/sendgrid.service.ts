import { Injectable } from '@nestjs/common';
import { MailDataRequired } from '@sendgrid/mail';
import { OrderEntity } from 'src/order/repositories/order.entity';
import ORDER_PENANTY_EMAIL from 'src/sendgrid/order.template';
import { SendgridRRepository } from 'src/sendgrid/sendgrid.repository';
type IOrderMail = {
    order: OrderEntity;
    paymentLink?: string;
};

@Injectable()
export class SendgridService {
    constructor(private readonly sendgridRepository: SendgridRRepository) {}
    sendMail(data: Pick<MailDataRequired, 'to' | 'subject' | 'text' | 'html'>) {
        return this.sendgridRepository.send({
            ...data,
            text: data.text || '',
            from: 'ngocvlqt1995@gmail.com',
        });
    }

    sendPenantyEmail(orderData: IOrderMail, receiveEmail: string) {
        const { order, paymentLink } = orderData;
        const tempalte = ORDER_PENANTY_EMAIL(order, paymentLink);

        return this.sendgridRepository.send({
            to: receiveEmail,
            from: 'ngocvlqt1995@gmail.com',
            subject: `Payment damage book's order`,
            html: tempalte,
        });
    }
}
