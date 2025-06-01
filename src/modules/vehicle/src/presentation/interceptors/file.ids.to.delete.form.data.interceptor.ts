import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

export default class FileIdsToDeleteFormDataInterceptor implements NestInterceptor {

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> {

        const req = context.switchToHttp().getRequest();
        console.log(req.body);

        if (req.body.deleteIds !== undefined) {

            if (typeof req.body.deleteIds === 'string') {

                try {

                    req.body.deleteIds = req.body.deleteIds.split(',').map(id => id.trim());

                } catch (error) {

                    throw new BadRequestException('Invalid deleteIds format');

                }

            }

            else if (!Array.isArray(req.body.deleteIds)) {

                req.body.deleteIds = [req.body.deleteIds];

            }

            if (!req.body.deleteIds.every(id => typeof id === 'string')) {

                throw new BadRequestException('all deleteIds must be strings');

            }

        } else {

            req.body.deleteIds = [];

        }

        return next.handle();

    };

};