import { Inject, Injectable } from "@nestjs/common";
import EvidenceCreatedEvent from "src/modules/evidence/src/domain/events/evidence.created.event";
import IEventHandler from "src/modules/shared/src/application/contracts/i.event.handler";
import OrderRepository from "../../infrastructure/order.repository";
import { EvidenceType } from "src/modules/evidence/src/domain/enums/evidence.type";

@Injectable({})
export default class EvidenceCreatedHandler implements IEventHandler<EvidenceCreatedEvent> {

    public constructor(
        @Inject(OrderRepository)
        private readonly orderRepository: OrderRepository,
    ) { }

    public async handle(event: EvidenceCreatedEvent): Promise<void> {

        const { orderId, type } = event;

        try {

            if (type == "DEPARTURE") {

                await this.orderRepository.update({
                    id: orderId,
                    updateObj: {
                        status: "IN_TRANSIT",
                        subStatus: "PICKUP",
                    }
                });

            };

            if (type == "DESTINATION") {

                await this.orderRepository.update({
                    id: orderId,
                    updateObj: {
                        status: "HISTORY",
                        subStatus: "COMPLETE",
                    }
                });

            };

            if (type == "REPORT") {

                await this.orderRepository.update({
                    id: orderId,
                    updateObj: {
                        status: "HISTORY",
                        subStatus: "REPORT",
                    }
                });

            };

        } catch (error) {

            throw error;

        }

    };

};
