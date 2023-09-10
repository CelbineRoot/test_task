import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ContextService} from "../context/context.service";
import {Request} from 'express';
import {UserService} from "../user/user.service";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly contextService: ContextService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
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

            const tokenPayload = await this.jwtService.verifyAsync<{
                username: string;
                sub: string;
                iat: number;
            }>(token);

            if (!tokenPayload.sub) {
                throw new UnauthorizedException();
            }

            const user = await this.userService.findById(tokenPayload.sub);

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
