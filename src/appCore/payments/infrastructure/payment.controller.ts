import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    createSwagger,
    deleteSwagger,
    findOneSwagger,
    findSwagger,
    updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';

import { RequestUserId } from 'src/_shared/domain/requestId';
import { PaymentEntity } from '../domain/payment.entity';
import { PaymentDto, UpdatePaymentDto } from '../domain/payment.dtos';
import { PaymentsService } from '../application/payment.service';
import { PaginationPaymentDto } from '../domain/pagination-payment.dto';

const controllerName = 'Payments';
@ApiTags('Payments/')
@Controller({
    path: 'payments/',
    version: '1',
})
export class PaymentsController {
    constructor(private readonly service: PaymentsService) { }

    /**
     * Creates a role.
     * @param body DTO of the creation of a role.
     * @returns The created role or an error.
     */

    @HttpCode(HttpStatus.CREATED)
    @ApiResponseSwagger(createSwagger(PaymentEntity, controllerName))
    @Post()
    async createPayment(
        @Body() body: PaymentDto,
        @Request() req: RequestUserId
    ): Promise<PaymentEntity | { url: string }> {
        return this.service.createLogicShipperPayment(
            body,
            req.user.companyId,
            req.user.id
        );
    }

    /**
     * Gets all roles. It allows to filter by any field contained in the DTO object of the role.
     * @param page Number of the page to retrieve.
     * @param limit Limit of roles to retrieve.
     * @param filter Filter of the roles to be retrieved in stringified JSON format.
     * @returns roles that match a given filter or an error.
     */

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findSwagger(PaymentEntity, controllerName))
    @Get()
    async findAll(
        @Query() pagination: PaginationPaymentDto,
        @Request() req: RequestUserId
    ) {
        return this.service.findAllPayments(
            {
                skip: pagination.page,
                take: pagination.perPage,
                where: { companyId: req.user.companyId },
            },
            pagination
        );
    }

    /**
     * Gets a role by id.
     * @param id ID of the role to retrieve.
     * @returns Payment that matches the given id or an error.
     */

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findOneSwagger(PaymentEntity, controllerName))
    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Request() req: RequestUserId
    ): Promise<PaymentEntity> {
        return this.service.findOne(
            this.service.companyFilter(id, req.user.companyId)
        );
    }

    /**
     * Gets a role by id.
     * @param id Push payment.
     * @returns Payment that matches the given id or an error.
     */

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findOneSwagger(PaymentEntity, controllerName))
    @Get('payment_now/:id')
    async paymentNow(
        @Param('id') id: string,
        @Request() req: RequestUserId
    ): Promise<any> {
        return this.service.paymentNow(id, req.user.companyId);
    }

    /**
     * Updates a role. It allows to update any field contained in the DTO object of the role.
     * @param id ID of the role to update.
     * @param UpdatePaymentDto Object containing the fields to update.
     * @returns The updated role or an error.
     */

    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponseSwagger(updateSwagger(PaymentEntity, controllerName))
    @Patch(':id')
    async updatePayment(
        @Param('id') id: string,
        @Body() updatePaymentDto: UpdatePaymentDto,
        @Request() req: RequestUserId
    ): Promise<PaymentEntity> {
        return this.service.update(
            this.service.companyFilter(id, req.user.companyId),
            {
                data: updatePaymentDto,
                ...this.service.companyFilter(id, req.user.companyId),
            }
        );
    }

    /**
     * Deletes a role by id.
     * @param id ID of the role to delete.
     * @returns Null or an error.
     */

    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponseSwagger(deleteSwagger(PaymentEntity, controllerName))
    @Delete(':id')
    async deletePayment(
        @Param('id') id: string,
        @Request() req: RequestUserId
    ): Promise<PaymentEntity> {
        return this.service.remove(
            this.service.companyFilter(id, req.user.companyId),
            this.service.companyFilter(id, req.user.companyId)
        );
    }
}
