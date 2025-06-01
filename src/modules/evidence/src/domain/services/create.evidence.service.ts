import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import FindOneOrderByIdService from "src/modules/order/src/domain/services/find.one.order.by.id.service";
import IEventDispatcher from "src/modules/shared/src/application/contracts/i.event.dispatcher";
import GeoPoint from "src/modules/shared/src/domain/valueObjects/geo.point";
import GeoAdapter from "src/modules/shared/src/infrastructure/adapters/geo.adapter";
import S3Adapter from "src/modules/shared/src/infrastructure/adapters/s3.adapter";
import { EventDispatcher } from "src/modules/shared/src/infrastructure/event.dispatcher";
import FindOneUserByIdService from "src/modules/user/src/domain/services/find.one.user.by.id.service";
import EvidenceRepository from "../../infrastructure/evidence.repository";
import { EvidenceType } from "../enums/evidence.type";
import EvidenceCreatedEvent from "../events/evidence.created.event";
import Evidence from "../evidence";

@Injectable({})
export default class CreateEvidenceService {

    private readonly radius = 200;

    public constructor(
        private readonly evidenceRepository: EvidenceRepository,
        private readonly findOneUserByIdService: FindOneUserByIdService,
        private readonly findOneOrderByIdService: FindOneOrderByIdService,
        private readonly geoAdapter: GeoAdapter,
        @Inject(EventDispatcher)
        private readonly eventDispatcher: IEventDispatcher,
        private readonly storage: S3Adapter,
    ) { };

    public async create(
        params: {
            userId: string,
            orderId: string,
            description: string,
            type: EvidenceType,
            coordinates: {
                longitude: number,
                latitude: number,
            },
            files: {
                fileName: string,
                key: string,
                size: number,
                eTag: string,
                mimeType: string,
                metadata?: Record<string, any>,
            }[],
        }
    ) {

        const {
            userId,
            orderId,
            coordinates,
            files,
            description,
            type
        } = params;

        try {

            const user = await this.findOneUserByIdService.find({ id: userId });

            const order = await this.findOneOrderByIdService.find({ id: orderId });

            const departure = {
                longitude: Number(order.departure.longitude),
                latitude: Number(order.departure.latitude),
            };

            const distance = this.geoAdapter.distance({
                p1: departure,
                p2: coordinates
            });

            if (
                order.driverId.toString() !== user.id
                &&
                order.userId !== user.id
            ) {

                throw new NotFoundException("order not found");

            };

            if (distance <= this.radius) {

                return {
                    warning: `You must be at least ${this.radius} meters from the starting point.`
                };

            };

            // const evidences = await this.evidenceRepository.findByFileKeys({
            //     keys: files.map((file) => file.key)
            // });

            // const allKeys = evidences.flatMap((e) => e.files.map((f) => f[0]));

            // const filterFiles = files.filter((file) => !allKeys.includes(file.key));

            const newGeoPoint = new GeoPoint(coordinates);

            const newEvidence = new Evidence({
                description,
                geoPoint: newGeoPoint,
                type
            });

            await this.evidenceRepository.save({
                userId: userId,
                orderId: orderId,
                evidence: newEvidence,
                files,
            });

            const newEvidenceCreatedEvent = new EvidenceCreatedEvent(
                {
                    userId,
                    orderId,
                    occurredAt: new Date(),
                    type,
                }
            );

            await this.eventDispatcher.dispatch(newEvidenceCreatedEvent);

        } catch (error) {

            if (error instanceof NotFoundException) {

                throw error;

            };

            throw new InternalServerErrorException(error);

        };

    };

};