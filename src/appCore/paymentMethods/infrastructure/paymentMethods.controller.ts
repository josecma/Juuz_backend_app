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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentMethodsService } from '../application/paymentMethods.service';
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import {
  UpdatePaymentMethodDto,
  PaymentMethodDto,
} from '../domain/paymentMethod.dtos';
import { PaginationPaymentMethodDto } from '../domain/pagination-paymentMethod.dto';
import { PaymentMethodEntity } from '../domain/paymentMethod.entity';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'PaymentMethods';
@ApiTags('PaymentMethods')
@Controller({
  path: 'payment_methods/',
  version: '1',
})
export class PaymentMethodsController {
  constructor(private readonly service: PaymentMethodsService) {}

  /**
   * Creates a paymentMethod.
   * @param body DTO of the creation of a paymentMethod.
   * @returns The created paymentMethod or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(PaymentMethodDto, controllerName))
  @Post()
  async createPaymentMethod(
    @Body() body: PaymentMethodDto
  ): Promise<PaymentMethodEntity> {
    return await this.service.create({
      data: { ...body },
    });
  }

  /**
   * Gets all paymentMethods. It allows to filter by any field contained in the DTO object of the paymentMethod.
   * @param page Number of the page to retrieve.
   * @param limit Limit of paymentMethods to retrieve.
   * @param filter Filter of the paymentMethods to be retrieved in stringified JSON format.
   * @returns paymentMethods that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(PaymentMethodDto, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationPaymentMethodDto
  ): Promise<PaginatedResponse<PaymentMethodEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  /**
   * Gets a paymentMethod by id.
   * @param id ID of the paymentMethod to retrieve.
   * @returns PaymentMethod that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(PaymentMethodDto, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PaymentMethodEntity> {
    return this.service.findOne(this.service.filter(id));
  }

  /**
   * Updates a paymentMethod. It allows to update any field contained in the DTO object of the paymentMethod.
   * @param id ID of the paymentMethod to update.
   * @param UpdatePaymentMethodDto Object containing the fields to update.
   * @returns The updated paymentMethod or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(PaymentMethodDto, controllerName))
  @Patch(':id')
  async updatePaymentMethod(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto
  ): Promise<PaymentMethodEntity> {
    return this.service.update(this.service.filter(id), {
      data: updatePaymentMethodDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a paymentMethod by id.
   * @param id ID of the paymentMethod to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(PaymentMethodDto, controllerName))
  @Delete(':id')
  async deletePaymentMethod(
    @Param('id') id: string
  ): Promise<PaymentMethodEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id)
    );
  }
}
