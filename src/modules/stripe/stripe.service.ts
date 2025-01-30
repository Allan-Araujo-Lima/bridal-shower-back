import { Inject, Injectable } from '@nestjs/common';
import { ProductType } from 'src/utils/products-list';
import Stripe from 'stripe';
import { User } from '../user/repository/index.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private readonly authService: AuthService) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    constructEvent(body: ReadableStream<Uint8Array<ArrayBufferLike>>, sig: any, webhookSecret: string): Stripe.Event {
        throw new Error("Method not implemented.");
    }
    async createCharge(amount: number, currency: string, source: string) {
        return this.stripe.charges.create({
            amount,
            currency,
            source,
        });
    }

    async createCheckoutSession(idProduct: number, token: string) {
            const userId = await this.authService.getUserId(token);

            console.log(userId);

        const productPrice = ProductType[idProduct];
        if (!productPrice) {
            throw new Error('Invalid product ID');
        }

        return this.stripe.checkout.sessions.create({
            line_items: [
                {
                    price: productPrice,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: {
                userId: userId,
                productId: idProduct.toString(),
            },
            success_url: process.env.SUCCESS_URL,
            cancel_url: process.env.CANCEL_URL,
        });
    }

}