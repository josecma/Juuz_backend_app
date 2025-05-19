import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Query,
  Request,
  UnauthorizedException
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesEnum } from '@prisma/client';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { RequestUserId } from 'src/_shared/domain/requestId';
import {
  findOneSwagger,
  findSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { NegotiationsService } from '../application/negotiations.service';
import { NegotiationDto } from '../domain/negotiation.dtos';
import { NegotiationEntity } from '../domain/negotiation.entity';
import { PaginationNegotiationDto } from '../domain/pagination-negotiation.dto';
import GetOrderNegotiationsUseCase from 'src/modules/order/src/application/useCases/get.order.negotiations.use.case';

const controllerName = 'NegotiationsShipper';
@ApiTags('NegotiationsShipper')
@Controller({
  path: 'negotiations_shipper/',
  version: '1',
})
export class NegotiationsShipperController {

  public constructor(
    private readonly service: NegotiationsService,
    @Inject(GetOrderNegotiationsUseCase)
    private readonly getOrderNegotiationsUseCase: GetOrderNegotiationsUseCase,
  ) { }

  /**
   * Gets all negotiations. It allows to filter by any field contained in the DTO object of the negotiation.
   * @param page Number of the page to retrieve.
   * @param limit Limit of negotiations to retrieve.
   * @param filter Filter of the negotiations to be retrieved in stringified JSON format.
   * @returns negotiations that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(NegotiationDto, controllerName))
  @Get('shiepersApplyings/:id')
  async shiepersApplyings(
    @Query() pagination: PaginationNegotiationDto,
    @Request() req: RequestUserId,
    @Param('id') id: string
  ): Promise<any> {

    const { page, perPage } = pagination;

    try {

      return await this.getOrderNegotiationsUseCase.execute(
        {
          orderId: id,
          pagination: {
            take: perPage,
            skip: (page - 1) * perPage,
          }
        }
      );

    } catch (error) {

      return { err: `${error.message}` };

    };

    // const select: Prisma.NegotiationSelect = {
    //   id: true,
    //   userId: true,
    //   driverId: true,
    //   orderId: true,
    //   offerCarrier: true,
    //   status: true,
    //   counterOfferShipper: true,
    //   lastNegotiaton: true,
    //   driver: {
    //     select: {
    //       userCompanyRoles: {
    //         select: {
    //           company: {
    //             select: {
    //               id: true,
    //               rating: true,
    //               companyName: true,
    //               phone: true,
    //               hours: true,
    //             },
    //           },
    //         },
    //       },
    //       driver: {
    //         select: {
    //           vehicleInfo: {
    //             select: {
    //               model: {
    //                 select: {
    //                   name: true,
    //                   brand: {
    //                     select: {
    //                       name: true,
    //                     },
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // };

    // return this.service.find({
    //   skip: pagination.page,
    //   take: pagination.perPage,
    //   where: {
    //     // userId: req.user.id,
    //     orderId: +id,
    //     // order: {
    //     //   id: +id,
    //     // },
    //   },
    // });
  };

  /**
   * Gets all Carriers applying. It allows to filter by any field contained in the DTO object of the negotiation.
   * @param page Number of the page to retrieve.
   * @param limit Limit of negotiations to retrieve.
   * @param filter Filter of the negotiations to be retrieved in stringified JSON format.
   * @returns Carriers applying that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(NegotiationDto, controllerName))
  @Get('/carriersApplying')
  async findAllCarriersApplying(
    @Query() pagination: PaginationNegotiationDto,
    @Request() req: RequestUserId
  ): Promise<PaginatedResponse<NegotiationEntity>> {
    if (req.user.logType === RolesEnum.COMPANY)
      throw new UnauthorizedException(
        'You are not authorized to perform this action.'
      );
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
      select: this.service.select,
      where: {
        driverId: req.user.id,
      },
    });
  }

  /**
   * Gets a negotiation by id.
   * @param id ID of the negotiation to retrieve.
   * @returns Negotiation that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(NegotiationEntity, controllerName))
  @Get('driversApplyings/:id')
  async oneDriversApplying(
    @Param('id') id: string,
    @Request() req: RequestUserId
  ): Promise<PaginatedResponse<NegotiationEntity>> {
    const data = await this.service.findAll({
      where: {
        orderId: +id,
      },
      select: {
        id: true,
        userId: true,
        driverId: true,
        orderId: true,
        offerCarrier: true,
        status: true,
        counterofferShipper: true,
        driver: {
          select: {
            companies: {
              select: {
                companyName: true,
                rating: true,
              },
            },
            driver: {
              select: {
                vehicleInfo: {
                  select: {
                    model: {
                      select: {
                        name: true,
                        brand: {
                          select: {
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return data;
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(NegotiationDto, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NegotiationEntity> {
    return this.service.findOne(this.service.filter(id));
  }
}
