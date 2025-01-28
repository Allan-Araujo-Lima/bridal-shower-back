import { Injectable, Controller, Post, Req, Res, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import Stripe from 'stripe';
import { UserService } from '../user/user.service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

@Injectable()
export class PaymentService {
    constructor(private readonly userService: UserService) { }
    validateWebhookSignature(payload: Buffer, signature: string): Stripe.Event {
        try {
            return stripe.webhooks.constructEvent(payload, signature, endpointSecret);
        } catch (err) {
            throw new HttpException(`Webhook Error: ${err.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    async handleEvent(event: Stripe.Event) {
        console.log(event)
        if (
            event.type === 'checkout.session.completed' ||
            event.type === 'checkout.session.async_payment_succeeded'
        ) {
            const sessionId = (event.data.object as any).id;
            await this.fulfillCheckout(sessionId, event.data.object.metadata.userId, event.data.object.metadata.productId);
        }
    }

    private async fulfillCheckout(sessionId: string, userId: string, productId: string) {
        await this.userService.activeUser(userId, productId);
        console.log(`Checkout session fulfilled: ${sessionId}`);
    }
}