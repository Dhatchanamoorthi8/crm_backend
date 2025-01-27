import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(logindto: LoginDto, body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        userData: {
            userid: any;
            username: any;
            email: any;
            role: any;
        };
    }>;
}
