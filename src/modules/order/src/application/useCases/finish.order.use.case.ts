import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import FindOneUserByIdService from "src/modules/user/src/domain/services/find.one.user.by.id.service";
import FindOneOrderByIdService from "../../domain/services/find.one.order.by.id.service";
import ChangeOrderStatusUseCase from "./change.order.status.use.case";

@Injectable({})
export default class FinishOrderUseCase {

    private readonly logger = new Logger(FinishOrderUseCase.name);

    public constructor(
        @Inject(FindOneUserByIdService)
        private readonly findOneUserByIdService: FindOneUserByIdService,
        @Inject(FindOneOrderByIdService)
        private readonly findOneOrderByIdService: FindOneOrderByIdService,
        private readonly changeOrderStatusUseCase: ChangeOrderStatusUseCase,
    ) { };

    public async execute(
        params: {
            userId: string,
            orderId: string,
        }
    ) {

        const {
            orderId,
            userId,
        } = params;

        try {

            const orderToFinish = await this.findOneOrderByIdService.find({ id: orderId });

            const user = await this.findOneUserByIdService.find(
                {
                    id: userId,
                }
            );

            if (orderToFinish.driverId !== user.id) {

                throw new NotFoundException('order not found');

            };

            const finishedOrder = await this.changeOrderStatusUseCase.execute(
                {
                    id: orderId,
                    updateObj: {
                        status: 'HISTORY',
                        subStatus: 'COMPLETE',

                    },
                }
            );

            return finishedOrder;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FinishOrderUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };
};