import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import FindOneUserByIdService from "src/modules/user/src/domain/services/find.one.user.by.id.service";
import FindOneOrderByIdService from "../../domain/services/find.one.order.by.id.service";
import ChangeOrderStatusUseCase from "./change.order.status.use.case";

@Injectable({})
export default class StartOrderUseCase {

    private readonly logger = new Logger(StartOrderUseCase.name);

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

            const orderToStart = await this.findOneOrderByIdService.find({ id: orderId });

            const user = await this.findOneUserByIdService.find(
                {
                    id: userId,
                }
            );

            if (orderToStart.driverId !== user.id) {

                throw new NotFoundException('order not found');

            };

            const startedOrder = await this.changeOrderStatusUseCase.execute(
                {
                    id: orderId,
                    updateObj: {
                        status: 'IN_TRANSIT',
                        subStatus: 'STARTED',
                    },
                }
            );

            return startedOrder;

        } catch (error) {

            this.logger.error(
                {
                    source: `${StartOrderUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };
};