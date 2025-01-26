import { Body, Controller, Post } from "@nestjs/common";
import { StripeService } from "./stripe.service";
import { CreateChargeDTO } from "./dto/create-charge.dto";
import { CreateCheckoutDTO } from "./dto/create-checkout.dto";

@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) { }

    @Post('charge')
    async chargeCard(@Body() paymentData: CreateChargeDTO) {
        return this.stripeService.createCharge(paymentData.amount, paymentData.currency, paymentData.source);
    }

    @Post('checkout')
    async checkoutSession(@Body() checkoutData: CreateCheckoutDTO) {
        return this.stripeService.createCheckoutSession(checkoutData.idProduct);
    }
}

