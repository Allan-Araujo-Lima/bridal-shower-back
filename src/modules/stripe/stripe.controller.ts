import { Body, Controller, Post, Headers, BadRequestException } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateChargeDTO } from './dto/create-charge.dto';
import { CreateCheckoutDTO } from './dto/create-checkout.dto';

@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) { }

    @Post('charge')
    async chargeCard(@Body() paymentData: CreateChargeDTO) {
        // Valida os dados do DTO
        if (!paymentData.amount || !paymentData.currency || !paymentData.source) {
            throw new BadRequestException('Invalid payment data');
        }

        return this.stripeService.createCharge(
            paymentData.amount,
            paymentData.currency,
            paymentData.source,
        );
    }

    @Post('checkout')
    async checkoutSession(
        @Body() checkoutData: CreateCheckoutDTO,
        @Headers('authorization') authHeader: string,
    ) {

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new BadRequestException('Authorization header missing or invalid');
        }

        const token = authHeader.split(' ')[1];

        if (!checkoutData.idProduct) {
            throw new BadRequestException('Product ID is required');
        }

        return this.stripeService.createCheckoutSession(checkoutData.idProduct, token);
    }
}
