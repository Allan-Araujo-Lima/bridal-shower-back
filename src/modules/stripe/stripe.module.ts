import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { UserModule } from '../user/user.module';
import { StripeController } from './stripe.controller';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [UserModule, AuthModule],
    providers: [StripeService, PaymentService],
    exports: [StripeService],
    controllers: [StripeController, PaymentController]
})
export class StripeModule { }
