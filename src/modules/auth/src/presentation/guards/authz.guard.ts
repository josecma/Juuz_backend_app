import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC } from '../decorators/public.route.decorator';

@Injectable({})
export class AuthzGuard implements CanActivate {

    private readonly logger = new Logger(AuthzGuard.name);

    public constructor(
        @Inject(JwtService)
        private readonly jwtService: JwtService,
        @Inject(Reflector)
        private reflector: Reflector,
    ) { };

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC,
            [
                context.getHandler(),
                context.getClass(),
            ]
        );

        if (isPublic) {

            return true;

        };

        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);

        if (!token) {

            throw new UnauthorizedException(
                {
                    message: 'access token not provided',
                }
            );

        };

        try {

            let payload = await this.jwtService.verifyAsync(token);

            request.user = payload;

        } catch {

            this.logger.error(
                {
                    source: `${AuthzGuard.name}`,
                    message: 'not valid or expired token',
                }
            );

            throw new UnauthorizedException(
                {
                    message: 'not valid or expired token',
                }
            );

        };

        return true;

    };

    private extractTokenFromHeader(
        request: Request
    ): string | undefined {

        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;

    };

};