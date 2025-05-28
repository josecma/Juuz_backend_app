import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Inject,
    InternalServerErrorException,
    Patch,
    Query,
    Request,
    UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Prisma, TypePointEnum } from '@prisma/client';
import { isNumberString } from 'class-validator';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { CustomThrottleGuard } from 'src/_shared/infrastructure/guard/customThrottle.guard';
import {
    findSwagger,
    updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { AblyService } from 'src/_shared/providers/ably/application/ably.service';
// import ToggleAndReturnUserLocationUseCase from 'src/modules/user/src/application/useCases/toggle.and.return.user.location.use.case';
// import UpdateAndReturnUserUseCase from 'src/modules/user/src/application/useCases/update.and.return.user.use.case';
// import { PointCacheService } from '../application/pointCache.service';
import { PointsService } from '../application/points.service';
import { ListNearbyPointDto } from '../domain/listNearbyPoint.dtos';
import { NearbyPointDto, OnOrOffPointDto } from '../domain/nearbyPoint.dtos';
import { UpdateUserPointDto } from '../domain/point.dtos';
import { PointEntity } from '../domain/point.entity';

const controllerName = 'Drivers Points';
@ApiTags('Points')
@Controller({
    path: 'point_drivers/',
    version: '1',
})
export class PointsDriversController {
    constructor(
        private readonly service: PointsService,
        private readonly ablyService: AblyService,
        // private readonly pointCachesService: PointCacheService,
        // @Inject(ToggleAndReturnUserLocationUseCase)
        // private readonly toggleAndReturnUserLocationUseCase: ToggleAndReturnUserLocationUseCase,
        // private readonly updateAndReturnUserUseCase: UpdateAndReturnUserUseCase,
    ) { }

    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponseSwagger(updateSwagger(PointEntity, controllerName))
    @Patch('')
    @UseGuards(CustomThrottleGuard)
    @Throttle({
        default: {
            limit: 2,
            ttl: 10000,
        },
    })
    async updatePoint(
        @Request() req: RequestUserId,
        @Body() updatePointDto: UpdateUserPointDto
    ): Promise<any> {

        const { coords } = updatePointDto;

        try {

            // const user: Prisma.UserGetPayload<{
            // }> = await this.updateAndReturnUserUseCase.execute(
            //     {
            //         id: req.user.id.toString(),
            //         coordinates: {
            //             latitude: coords.latitude,
            //             longitude: coords.longitude,
            //         }
            //     }
            // );

            // const userIds: UserDriverResponse[] =
            //   await this.pointCachesService.getUserIdsByDriverId(req.user.id + '');

            // if (userIds.length) {
            //   await Promise.all(
            //     userIds.map(async (user) =>
            //       await this.ablyService.sendMessage(user.userId + '', {
            //         driverId: +user.driverId,
            //         longitude: updatePointDto.coords.longitude,
            //         latitude: updatePointDto.coords.latitude,
            //         status: AblyStatus.Point,
            //         action: AblyAction.Moving,
            //       })
            //     )
            //   );
            // }

            // await this.ablyService.sendMessage(req.user.id.toString(), {
            //   driverId: ,
            //   longitude: user.userPoint.point.longitude,
            //   latitude: user.userPoint.point.latitude,
            //   status: AblyStatus.Point,
            //   action: AblyAction.Moving,
            // }
            // );

        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException(error);
        };
        // const userIds: UserDriverResponse[] =
        //   await this.pointCachesService.getUserIdsByDriverId(req.user.id + '');
        // const data = await this.service.updatePointWihtUser(
        //   req.user.id,
        //   updatePointDto,
        //   true
        // );
        // if (userIds.length) {
        //   await Promise.all(
        //     userIds.map(async (user) =>
        //       await this.ablyService.sendMessage(user.userId + '', {
        //         driverId: +user.driverId,
        //         longitude: updatePointDto.coords.longitude,
        //         latitude: updatePointDto.coords.latitude,
        //         status: AblyStatus.Point,
        //         action: AblyAction.Moving,
        //       })
        //     )
        //   );
        // }
        // return data;
    }

    /**
     * Updates a Point. It allows to update any field contained in the DTO object of the Point.
     * @param id ID of the Point to update.
     * @param UpdatePointDto Object containing the fields to update.
     * @returns The updated Point or an error.
     */

    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponseSwagger(updateSwagger(PointEntity, controllerName))
    @Patch('on_or_off_driver_point/:id')
    async updateActivePoint(
        //@Param('id') id: string,
        @Request() req: RequestUserId,
        @Body() onOrOffPointDto: OnOrOffPointDto
    ) {

        try {

            const { coords } = onOrOffPointDto;

            // const point_by_user_id = await this.service.findOnePointByUserId(req.user.id);

            // let point = null;
            // if (point_by_user_id) {
            //   point = await this.service.classicUpdate(
            //     { where: { id: point_by_user_id.id, userId: req.user.id } },
            //     {
            //       where: { id: point_by_user_id.id, userId: req.user.id },
            //       data: {
            //         isActive: onOrOffPointDto.isActive,
            //         longitude: coords.longitude.toString(),
            //         latitude: coords.latitude.toString()
            //       },
            //     }
            //   );
            // } else {
            //   point = await this.service.create({
            //     coords: coords,
            //     pointName: "",
            //     address: "",
            //     city: "",
            //     state: "",
            //     driverId: null,
            //     orderId: null,
            //     comunicationId: null
            //   }, req.user.id, TypePointEnum.VEHICLE, isActive);
            // };

            // return { status: 201, point: point };

            // return await this.toggleAndReturnUserLocationUseCase.execute({
            //     id: req.user.id as unknown as string,
            //     coordinates: coords,
            // });

        } catch (error) {

            return { err: `${error.message}` };

        };

    };

    /**
     * Gets all Points. It allows to filter by any field contained in the DTO object of the Point.
     * @param page Number of the page to retrieve.
     * @param limit Limit of Points to retrieve.
     * @param filter Filter of the Points to be retrieved in stringified JSON format.
     * @returns Points that match a given filter or an error.
     */

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findSwagger(PointEntity, controllerName))
    @Get('nearby_order')
    async findAll(@Query() nearbyPointDto: NearbyPointDto): Promise<any> {
        if (
            !isNumberString(nearbyPointDto.latitude) ||
            !isNumberString(nearbyPointDto.longitude) ||
            !isNumberString(nearbyPointDto.longitude)
        )
            throw new BadRequestException('Values have to be numbers.');

        if (
            +nearbyPointDto.radiusInMilles <= 0 ||
            +nearbyPointDto.radiusInMilles % 5 != 0 ||
            +nearbyPointDto.radiusInMilles > 20
        )
            throw new BadRequestException(
                'Radiusinmilles has to be greater than zero, multiple of 5 and less than 20'
            );
        return await this.service.countPointsWithinDistance(
            +nearbyPointDto.latitude,
            +nearbyPointDto.longitude,
            +nearbyPointDto.radiusInMilles,
            true,
            TypePointEnum.DEPARTURE
        );
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
    @Get('list-nearby-order')
    async findAllFullInfo(
        @Query() listNearbyPointDto: ListNearbyPointDto
    ): Promise<any> {

        if (
            !isNumberString(listNearbyPointDto.latitude) ||
            !isNumberString(listNearbyPointDto.longitude) ||
            !isNumberString(listNearbyPointDto.longitude)
        )
            throw new BadRequestException('Values have to be numbers.');

        if (
            +listNearbyPointDto.radiusInMilles <= 0 ||
            +listNearbyPointDto.radiusInMilles % 5 != 0 ||
            +listNearbyPointDto.radiusInMilles > 20
        )
            throw new BadRequestException(
                'Radiusinmilles has to be greater than zero, multiple of 5 and less than 20'
            );
        return await this.service.listPointsWithinDistance(
            +listNearbyPointDto.latitude,
            +listNearbyPointDto.longitude,
            +listNearbyPointDto.radiusInMilles,
            true,
            TypePointEnum.DEPARTURE,
            // listNearbyPointDto.page,
            // listNearbyPointDto.pageSize
        );
    }
}
