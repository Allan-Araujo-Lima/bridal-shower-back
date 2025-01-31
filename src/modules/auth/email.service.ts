import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { MailerService } from "@nestjs-modules/mailer";
import { UpdateUserDto } from "../user/dto/update-user-dto";

@Injectable()
export class EmailService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private userService: UserService,
        private readonly mailerService: MailerService
    ) { }

    async sendResetPasswordLink(email: string): Promise<void> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        const payload = { id: user.id };
        const token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
        });

        const url = `${this.configService.get('EMAIL_RESET_PASSWORD_URL')}?token=${token}`;

        try {
            await this.mailerService.sendMail({
                from: 'naoresponda@weddingnow.com',
                to: email,
                subject: 'Resetar sua senha - Wedding Now',
                html: `<b>Olá ${user.name}!</b><br/><br/>
                       <p>Clique <a href="${url}">aqui</a> para redefinir sua senha.</p>`,
            });
        } catch (error) {
            throw new Error(`Erro ao enviar e-mail: ${error.message}`);
        }
    }
}
