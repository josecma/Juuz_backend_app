import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import FindOneOrderByIdService from "src/modules/order/src/domain/services/find.one.order.by.id.service";
import IEventDispatcher from "src/modules/shared/src/application/contracts/i.event.dispatcher";
import File from "src/modules/shared/src/domain/file";
import GeoPoint from "src/modules/shared/src/domain/valueObjects/geo.point";
import GeoAdapter from "src/modules/shared/src/infrastructure/adapters/geo.adapter";
import { EventDispatcher } from "src/modules/shared/src/infrastructure/event.dispatcher";
import FindOneUserByIdService from "src/modules/user/src/domain/services/find.one.user.by.id.service";
import EvidenceRepository from "../../infrastructure/evidence.repository";
import EvidenceRepositoryContract from "../contracts/repositories/evidence.repository.contract";
import { EvidenceType } from "../enums/evidence.type";
import EvidenceCreatedEvent from "../events/evidence.created.event";
import Evidence from "../evidence";
import FindEvidenceByOrderIdService from "./find.evidence.by.order.id.service";

@Injectable({})
export default class CreateEvidenceService {

    private readonly radius = 200;

    public constructor(
        @Inject(EvidenceRepository)
        private readonly evidenceRepository: EvidenceRepositoryContract,
        @Inject(FindOneUserByIdService)
        private readonly findOneUserByIdService: FindOneUserByIdService,
        @Inject(FindOneOrderByIdService)
        private readonly findOneOrderByIdService: FindOneOrderByIdService,
        @Inject(FindEvidenceByOrderIdService)
        private readonly findEvidenceByOrderIdService: FindEvidenceByOrderIdService,
        @Inject(GeoAdapter)
        private readonly geoAdapter: GeoAdapter,
        @Inject(EventDispatcher)
        private readonly eventDispatcher: IEventDispatcher,
    ) { };

    public async create(params: {
        userId: string;
        orderId: string;
        description: string;
        type: EvidenceType,
        coordinates: {
            longitude: number;
            latitude: number;
        }; files: {
            fileName: string;
            key: string;
            size: number;
            mimeType: string;
            metadata?: Record<string, any>;
        }[],
    }) {

        const { userId, orderId, coordinates, files, description, type } = params;

        try {

            const user = await this.findOneUserByIdService.find({ id: userId });

            const order = await this.findOneOrderByIdService.find({ id: orderId });

            const departure = {
                longitude: +order.departure.longitude,
                latitude: +order.departure.latitude,
            };

            const distance = this.geoAdapter.distance({
                p1: departure,
                p2: coordinates
            });

            if (order.driverId !== user.id && order.userId !== user.id) {

                throw new NotFoundException(`order with id ${orderId} not found.`);

            };

            const evidences = await this.evidenceRepository.findByFileKeys({
                keys: files.map((file) => file.key)
            });

            const newFiles = files.map((file) => {

                return new File(file);

            });

            const allKeys = evidences.flatMap((e) => e.files.map((f) => f[0]));

            const filterFiles = newFiles.filter((file) => !allKeys.includes(file.key));

            if (filterFiles.length > 0) {

                const newGeoPoint = new GeoPoint(coordinates);

                const newEvidence = new Evidence({
                    description,
                    geoPoint: newGeoPoint,
                    files: filterFiles,
                    type
                });

                await this.evidenceRepository.save({
                    userId: userId,
                    orderId: orderId,
                    evidence: newEvidence,
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

                if (distance <= this.radius) {

                    return {
                        warning: `You must be at least ${this.radius} meters from the starting point.`
                    };

                };

            };

        } catch (error) {

            if (error instanceof NotFoundException) {

                throw error;

            };

            throw new InternalServerErrorException(error);

        };

    };

};