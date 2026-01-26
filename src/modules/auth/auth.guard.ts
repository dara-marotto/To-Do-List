import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UserPayload } from "./auth.service";

export interface RequestWithUser extends Request {
    user: UserPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    private extractTokenFromHeader(req: Request): string | undefined{
        const authHeader = req.headers['authorization'];
        if(!authHeader) return undefined;

        const [ type, token ] = authHeader.split(' ');
        return type === 'Bearer' ? token : undefined;

    }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const token = this.extractTokenFromHeader(request);

        if(!token) throw new UnauthorizedException('Authentication error');

        try {
            const payload: UserPayload = await this.jwtService.verifyAsync(token);
            request.user = payload;
        } catch (err) {
            throw new UnauthorizedException('Invalid JWT')
        }
        return true;
    }
}