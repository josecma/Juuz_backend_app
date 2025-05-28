import {
    Body,
    Controller,
    Request,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    createSwagger,
    findOneSwagger,
    findSwagger,
    updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { NegotiationsService } from '../application/negotiations.service';
import {
    NegotiationDto,
    UpdateNegotiationDto,
} from '../domain/negotiation.dtos';
import { NegotiationEntity } from '../domain/negotiation.entity';
import { PaginationNegotiationDto } from '../domain/pagination-negotiation.dto';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { $Enums, Prisma } from '@prisma/client';

const controllerName = 'NegotiationsCarrier';
@ApiTags('NegotiationsCarrier')
@Controller({
    path: 'negotiations_carrier/',
    version: '1',
})
export class NegotiationsCarrierController {
    constructor(private readonly service: NegotiationsService) { }

    /**
     * Gets all Drivers applying. It allows to filter by any field contained in the DTO object of the negotiation.
     * @param page Number of the page to retrieve.
     * @param limit Limit of negotiations to retrieve.
     * @param filter Filter of the negotiations to be retrieved in stringified JSON format.
     * @returns Drivers applying that match a given filter or an error.
     */

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findSwagger(NegotiationDto, controllerName))
    @Get('/driversApplying')
    async findAllDriversApplying(
        @Query() pagination: PaginationNegotiationDto,
        @Request() req: RequestUserId
    ): Promise<PaginatedResponse<NegotiationEntity>> {
        // if (req.user.logType === RolesEnum.SHIPPER)
        //   throw new UnauthorizedException(
        //     'You are not authorized to perform this action.'
        //   );

        return this.service.findAll({
            skip: pagination.page,
            take: pagination.perPage,
            select: this.service.select,
            where: {
                userId: req.user.id,
                status: $Enums.NegotiationStatus.OPEN,
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
}
