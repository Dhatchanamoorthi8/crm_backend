import { MailService } from './mail.service';
export declare class AppController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendAccountCreatedEmail(body: {
        to: string;
        name: string;
        loginId: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
}
