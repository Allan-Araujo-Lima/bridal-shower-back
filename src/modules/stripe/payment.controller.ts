import { Controller, Post, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { PaymentService } from './payment.service';
import { Public } from '../auth/public.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('webhook')
@Controller('webhook')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Public()
    @Post()
    @ApiResponse({ status: 200, description: 'Webhook received' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async handleWebhook(@Req() req: Request, @Res() res: Response): Promise<void> {
        const sig = req.headers['stripe-signature'];
        console.log()
        if (!sig) {
            throw new HttpException('Missing Stripe signature', HttpStatus.BAD_REQUEST);
        }

        let event: Stripe.Event;

        try {
            event = this.paymentService.validateWebhookSignature(req.body, sig as string);
            await this.paymentService.handleEvent(event);
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatus.BAD_REQUEST).send(err.message);
            return;
        }

        res.status(HttpStatus.OK).send('Webhook received');
    }
}