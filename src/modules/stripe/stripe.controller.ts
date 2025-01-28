import { Body, Controller, Post, Headers, BadRequestException } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateChargeDTO } from './dto/create-charge.dto';
import { CreateCheckoutDTO } from './dto/create-checkout.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) { }

    @Post('charge')
    async chargeCard(@Body() paymentData: CreateChargeDTO) {
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
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a checkout session' })
    @ApiBody({ type: CreateCheckoutDTO })
    @ApiResponse({ status: 201, description: 'Checkout session created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
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
