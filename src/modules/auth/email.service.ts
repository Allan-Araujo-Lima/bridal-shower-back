import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private userService: UserService,
        private mailerService: MailerService) { }

    public async sendResetPasswordLink(email: string): Promise<void> {
        const payload = { email };

        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
        });

        const user = this.userService.findByEmail(email);
        (await user).reset_token = token;

        const url = `${this.configService.get('EMAIL_RESET_PASSWORD_URL')}?token=${token}`;

        return this.mailerService
            .sendMail({
                to: 'naoresponda@weddingnow.com',
                from: 'allanvoide@gmail.com',
                subject: 'Resetar sua senha - Wedding Now',
                html: `<b>Olá ${(await user).name}!</b></br> </br>
                <p>Clique <a href=${url}>aqui</a> para redefinir sua senha.</p>`
            })
            .then(() => { })
            .catch(() => { })
    }
}
