import { Injectable, Logger } from "@nestjs/common";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import S3Adapter from "src/modules/shared/src/infrastructure/adapters/s3.adapter";
import UUIDAdapter from "src/modules/shared/src/infrastructure/adapters/uuid.adapter";
import FindUserByIdUseCase from "src/modules/user/src/application/useCases/find.user.by.id.use.case";
import { OrderItemTypeEnum } from "../../domain/enums/order.item.type.enum";
import { OrderStatusEnum } from "../../domain/enums/order.status.enum";
import { OrderSubStatusEnum } from "../../domain/enums/order.sub.status.enum";
import { OrderItem } from "../../domain/types/order.item";
import { PostOrder } from "../../domain/types/post.order";
import { VehicleItem } from "../../domain/types/vehicle.item";
import OrderShipperWriteRepository from "../../infrastructure/repositories/order.shipper.write.repository";

@Injectable()
export default class PostOrderUseCase {

    private readonly logger = new Logger(PostOrderUseCase.name);

    public constructor(
        private readonly orderShipperWriteRepository: OrderShipperWriteRepository,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly s3Adapter: S3Adapter,
    ) { };

    public async execute(
        params: PostOrder
    ) {

        const {
            shipperId,
            items,
            pricePerMile,
            price,
            miles,
            ...orderRest
        } = params;

        const uploadedFiles = new Map<string, any>();

        try {

            const findUserById = await this.findUserByIdUseCase.execute(
                {
                    userId: shipperId
                }
            );

            if (findUserById == null) {

                throw new NotFoundDomainException(
                    {
                        message: 'shipper not found'
                    }
                )
            };

            const mappedItems = await Promise.all(

                items.map(

                    async (i: OrderItem<any>) => {

                        let orderItem: OrderItem<any>;

                        if (i.type == OrderItemTypeEnum.VEHICLE) {

                            const vehicleItem = (<OrderItem<VehicleItem>>i);

                            const uploadedPictures = await this.s3Adapter.uploadFiles(vehicleItem.item.pictures);

                            uploadedPictures.forEach(

                                (v, k) => {

                                    uploadedFiles.set(k, v);

                                }

                            );

                            const picturesInfo = vehicleItem.item.pictures.map(

                                (pic) => {

                                    const { buffer, originalName, uniqueName, ...picRest } = pic;

                                    return {
                                        ...picRest,
                                        eTag: uploadedPictures.get(uniqueName),
                                        key: uniqueName,
                                        size: buffer.length,
                                    }

                                }

                            );

                            const { item, ...orderItemRest } = (<OrderItem<VehicleItem>>i);

                            const { pictures, ...itemRest } = item;

                            orderItem = {
                                ...orderItemRest,
                                item: {
                                    ...itemRest,
                                    pictures: picturesInfo,
                                }
                            };

                        };

                        orderItem.id = UUIDAdapter.get();

                        return orderItem;

                    }

                )

            );

            const postOrderResponse = await this.orderShipperWriteRepository.save(
                {
                    shipperId,
                    ...orderRest,
                    status: OrderStatusEnum.PENDING,
                    subStatus: OrderSubStatusEnum.UPCOMING,
                    pricePerMile: price * miles,
                    price,
                    miles,
                    items: mappedItems,
                }
            );

            return postOrderResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${PostOrderUseCase.name}`,
                    message: error.message,
                }
            );

            if (uploadedFiles.size > 0) this.s3Adapter.deleteFiles(Array.from(uploadedFiles.values()))

            throw error;

        };

    };

};