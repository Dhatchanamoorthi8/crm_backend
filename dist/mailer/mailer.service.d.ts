import { MailerService } from '@nestjs-modules/mailer';
export declare class MailerServices {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendOtpEmail(email: string, otp: string): Promise<SentMessageInfo>;
}
