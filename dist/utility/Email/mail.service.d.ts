import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendAccountCreatedEmail(to: string, name: string, loginId: string, password: string, loginUrl: string): Promise<SentMessageInfo>;
}
