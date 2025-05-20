import {
    Controller,
    HttpCode,
    HttpStatus,
    Request,
    Patch,
    Param,
    BadRequestException,
    UseGuards,
    Get,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    findSwagger,
    updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { PointEntity } from '../domain/point.entity';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { PointCacheService } from '../application/pointCache.service';
import { PositiveNumberStringPipe } from 'src/_shared/infrastructure/validators/paramsPositeNumber.validator';
import { OrdersService } from 'src/appCore/orders/application/orders.service';
import { OrderStatusEnum, Prisma } from '@prisma/client';
import { Throttle } from '@nestjs/throttler';
import { CustomThrottleGuard } from 'src/_shared/infrastructure/guard/customThrottle.guard';
import { NearbyPointDto } from '../domain/nearbyPoint.dtos';
import { PointsService } from '../application/points.service';

const controllerName = 'Point Shippers';
@ApiTags('Points')
@Controller({
    path: 'point_shippers/',
    version: '1',
})
export class PointsShippersController {
    constructor(
        private readonly pointCacheService: PointCacheService,
        private readonly ordersService: OrdersService,
        private readonly service: PointsService
    ) { }

    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponseSwagger(updateSwagger(PointEntity, controllerName))
    @UseGuards(CustomThrottleGuard)
    @Throttle({
        default: {
            limit: 2,
            ttl: 119000,
        },
    })
    @Patch('subscribe_driver/:id')
    async updatePoint(
        @Request() req: RequestUserId,
        @Param('id', PositiveNumberStringPipe) id: string
    ): Promise<any> {
        const find: Prisma.OrderFindFirstArgs = {
            where: {
                userId: req.user.id.toString(),
                driverId: id,
                OR: [
                    { status: OrderStatusEnum.IN_TRANSIT },
                    { status: OrderStatusEnum.ASSIGNED },
                ],
            },
            orderBy: {
                createdAt: 'asc',
            },
        };
        const order = await this.ordersService.model.findFirst(find);
        if (!order)
            new BadRequestException('You cant subscribe to that driver id.');
        return this.pointCacheService.addOrUpdateEntry({
            userId: req.user.id + '',
            driverId: id + '',
        });
    }

    /**
     * Gets all Points. It allows to filter by any field contained in the DTO object of the Point.
     * @param page Number of the page to retrieve.
     * @param limit Limit of Points to retrieve.
     * @param filter Filter of the Points to be retrieved in stringified JSON format.
     * @returns Points that match a given filter or an error.
     */

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findSwagger(PointEntity, controllerName))
    @Get('nearby_driver')
    async findAll(
        @Query() nearbyPointDto: NearbyPointDto
    ): Promise<PointEntity[]> {
        return await this.service.findPointsWithinDistance(
            +nearbyPointDto.latitude,
            +nearbyPointDto.longitude,
            +nearbyPointDto.radiusInMilles,
            true
        );
    }
}
