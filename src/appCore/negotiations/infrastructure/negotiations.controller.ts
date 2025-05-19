import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  Request
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { RequestUserId } from 'src/_shared/domain/requestId';
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import BadRequestDomainException from 'src/modules/shared/src/domain/exceptions/bad.request.domain.exception';
import IdDto from 'src/modules/shared/src/presentation/dtos/id.dto';
import { NegotiationsService } from '../application/negotiations.service';
import {
  NegotiationDto,
  UpdateNegotiationDto,
} from '../domain/negotiation.dtos';
import { NegotiationEntity } from '../domain/negotiation.entity';
import { PaginationNegotiationDto } from '../domain/pagination-negotiation.dto';
import GetTrackingChannelUseCase from 'src/modules/negotiation/src/application/useCases/get.tracking.channel.use.case';
import DomainException from 'src/modules/shared/src/domain/exceptions/domain.exception';

const controllerName = 'Negotiations';
@ApiTags('Negotiations')
@Controller({
  path: 'negotiations/',
  version: '1',
})
export class NegotiationsController {
  constructor(
    private readonly service: NegotiationsService,
    @Inject(GetTrackingChannelUseCase)
    private readonly getTrackingChannelUseCase: GetTrackingChannelUseCase,
  ) { }

  /**
   * Creates a negotiation.
   * @param body DTO of the creation of a negotiation.
   * @returns The created negotiation or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(NegotiationDto, controllerName))
  @Post()
  async createNegotiation(
    @Body() body: NegotiationDto,
    @Request() req: RequestUserId
  ): Promise<NegotiationEntity> {
    // if (req.user.logType === LogEnum.SHIPPER)
    //   throw new UnauthorizedException(
    //     'You are not authorized to perform this action.',
    //   );
    return this.service.createSend(body, req.user.id, req.user.companyId);
  }

  /**
   * Gets all negotiations. It allows to filter by any field contained in the DTO object of the negotiation.
   * @param page Number of the page to retrieve.
   * @param limit Limit of negotiations to retrieve.
   * @param filter Filter of the negotiations to be retrieved in stringified JSON format.
   * @returns negotiations that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(NegotiationDto, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationNegotiationDto,
    @Request() req: RequestUserId
  ): Promise<PaginatedResponse<NegotiationEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(NegotiationDto, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NegotiationEntity> {
    return this.service.findOne(this.service.filter(id));
  }

  /**
   * Updates a negotiation. It allows to update any field contained in the DTO object of the negotiation.
   * @param id ID of the negotiation to update.
   * @param UpdateNegotiationDto Object containing the fields to update.
   * @returns The updated negotiation or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(NegotiationDto, controllerName))
  @Patch(':id')
  async updateNegotiation(
    @Param('id') id: string,
    @Body() updateNegotiationDto: UpdateNegotiationDto,
    @Request() req: RequestUserId
  ): Promise<NegotiationEntity> {
    return this.service.updateSend(
      updateNegotiationDto,
      id,
      req.user.id,
      req.user.logType,
      req.user.companyId
    );
  }

  /**
   * Deletes a negotiation by id.
   * @param id ID of the negotiation to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(NegotiationDto, controllerName))
  @Delete(':id')
  async deleteNegotiation(@Param('id') id: string): Promise<NegotiationEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id),
    );
  }

  @Get("contact/to")
  @ApiOperation(
    {
      summary: "contact user by id",
    }
  )
  @ApiQuery(
    {
      type: String,
      example: "1",
      name: "orderId"
    }
  )
  public async contactTo(
    @Query("orderId") query: string,
    @Request() req: RequestUserId
  ) {
    try {
      return await this.getTrackingChannelUseCase.execute(
        {
          userId: req.user.id.toString(),
          orderId: query,
        }
      );
    } catch (error) {
      if (error instanceof Error) return error.message;
      if (error instanceof DomainException) return error.message;
      if (error instanceof BadRequestDomainException) return new BadRequestException(`${error.message}`)
      return new InternalServerErrorException(error);
    };
  };

}
