import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {ContextService} from "../context/context.service";
import {Request} from 'express';
import {AuthService} from "./auth.service";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly contextService: ContextService,
        private readonly authService: AuthService,
    ) {
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        try {
            if (!token) {
                throw new UnauthorizedException();
            }

            const user = await this.authService.validate(token);

            if (!user) {
                throw new UnauthorizedException();
            }

            this.contextService.user = user;
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error_message: 'Bad token',
            }, HttpStatus.FORBIDDEN);
        }

        return true;
    }
}
