import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createSwagger } from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';

import { RequestUserId } from 'src/_shared/domain/requestId';
import { PaymentEntity } from '../domain/payment.entity';
import { PaymentCashDto } from '../domain/payment.dtos';
import { PaymentsService } from '../application/payment.service';

const controllerName = 'Payments_Carrier';
@ApiTags('Payments_Carrier/')
@Controller({
    path: 'payments_carrier/',
    version: '1',
})
export class PaymentsCarrierController {
    constructor(private readonly service: PaymentsService) { }

    /**
     * Creates a role.
     * @param body DTO of the creation of a role.
     * @returns The created role or an error.
     */

    @HttpCode(HttpStatus.CREATED)
    @ApiResponseSwagger(createSwagger(PaymentEntity, controllerName))
    @Post('cash/')
    async createPayment(
        @Body() body: PaymentCashDto,
        @Request() req: RequestUserId
    ): Promise<PaymentEntity | { url: string }> {
        return this.service.createLogicCarrierPayment(
            body,
            req.user.companyId,
            req.user.id
        );
    }
}
