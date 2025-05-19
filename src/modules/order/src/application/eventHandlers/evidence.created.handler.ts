import { Injectable } from "@nestjs/common";
import EvidenceCreatedEvent from "src/modules/evidence/src/domain/events/evidence.created.event";
import IEventHandler from "src/modules/shared/src/application/contracts/i.event.handler";
import ChangeOrderStatusUseCase from "../useCases/change.order.status.use.case";

@Injectable({})
export default class EvidenceCreatedHandler implements IEventHandler<EvidenceCreatedEvent> {

    public constructor(
        private readonly changeOrderStatusUseCase: ChangeOrderStatusUseCase,
    ) { }

    public async handle(event: EvidenceCreatedEvent): Promise<void> {

        const { orderId, type } = event;

        try {

            if (type == "DEPARTURE") {

                await this.changeOrderStatusUseCase.execute({
                    id: orderId,
                    updateObj: {
                        status: "IN_TRANSIT",
                        subStatus: "PICKUP",
                    }
                });

            };

            if (type == "DESTINATION") {

                await this.changeOrderStatusUseCase.execute({
                    id: orderId,
                    updateObj: {
                        status: "HISTORY",
                        subStatus: "COMPLETE",
                    }
                });

            };

            if (type == "REPORT") {

                await this.changeOrderStatusUseCase.execute({
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
