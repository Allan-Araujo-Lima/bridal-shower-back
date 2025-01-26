import { Inject, Injectable } from '@nestjs/common';
import { ProductType } from 'src/utils/products-list';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    async createCharge(amount: number, currency: string, source: string) {
        return this.stripe.charges.create({
            amount,
            currency,
            source,
        });
    }

    async createCheckoutSession(idProduct: number) {
        return this.stripe.checkout.sessions.create({
            line_items: [
                {
                    price: ProductType[idProduct],
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: process.env.success_url,
            cancel_url: process.env.cancel_url,
        });
    }
}