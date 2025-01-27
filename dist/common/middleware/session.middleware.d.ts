import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionsService } from 'src/sessions/sessions.service';
export declare class SessionMiddleware implements NestMiddleware {
    private sessionsService;
    constructor(sessionsService: SessionsService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
