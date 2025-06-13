import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { extname } from 'path';
import { Observable } from 'rxjs';
import { OrderItemTypeEnum } from '../../domain/enums/order.item.type.enum';
import { safeParser } from '../parsers/safe.parser';
import UUIDAdapter from 'src/modules/shared/src/infrastructure/adapters/uuid.adapter';

@Injectable()
export default class PostOrderFormDataInterceptor implements NestInterceptor {

    public intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<any> {

        const ctx = context.switchToHttp();

        const req = ctx.getRequest<Request>();

        if (req.is('multipart/form-data')) {

            this.processFormData(req);

        };

        return next.handle();

    };

    private processFormData(req: Request) {

        const {
            phoneNumber,
            email,
            firstName,
            lastName,
            miles,
            note,
            paymentMethod,
            isAssistanceRequestForNow,
            pickUpAt,
            deliveryAt,
            expirationTime,
            price,
            rute,
            departure,
            destination,
            items,
        } = req.body;

        let postOrder: { [key: string]: any } = {};

        const processLocation = loc => loc ? {
            latitude: safeParser.number(loc.latitude),
            longitude: safeParser.number(loc.longitude)
        } : undefined;

        const processAddress = addr => addr ? {
            city: safeParser.string(addr.city),
            state: safeParser.string(addr.state),
            zipCode: safeParser.string(addr.zipCode),
            street: safeParser.string(addr.street),
            country: safeParser.string(addr.country),
            location: processLocation(addr.location)
        } : undefined;

        postOrder = {
            price: safeParser.float(price),
            phoneNumber: safeParser.string(phoneNumber),
            email: safeParser.string(email),
            firstName: safeParser.string(firstName),
            lastName: safeParser.string(lastName),
            miles: safeParser.int(miles),
            note: safeParser.string(note),
            expirationTime: safeParser.date(expirationTime),
            paymentMethod: safeParser.string(paymentMethod),
            isAssistanceRequestForNow: safeParser.bool(isAssistanceRequestForNow),
            pickUpAt: safeParser.date(pickUpAt),
            rute: safeParser.string(rute),
            deliveryAt: safeParser.date(deliveryAt),
            departure: processAddress(departure),
            destination: processAddress(destination),
            items: Array.isArray(items) ? items.map(item => (
                {
                    type: OrderItemTypeEnum.VEHICLE,
                    content: {
                        year: safeParser.int(item.year),
                        modelId: safeParser.string(item.modelId),
                        isTheKeysWithTheVehicle: safeParser.bool(item.isTheKeysWithTheVehicle),
                        type: safeParser.string(item.type),
                        trailerType: safeParser.string(item.trailerType),
                        color: safeParser.string(item.color),
                        wideLoad: safeParser.bool(item.wideLoad),
                        status: safeParser.string(item.status),
                        information: safeParser.string(item.information),
                        pictures: []
                    }
                }
            )) : []
        };

        const files: { [key: string]: any } = {};

        Object.keys(req.files).forEach(

            key => {

                const match = req.files[key].fieldname.match(/^items\[(\d+)\]\[(\w+)\](?:\[(\d+)\])?$/);

                if (match) {

                    const [_, index] = match;

                    const { originalname, buffer, mimetype, fieldname, encoding, ...fileRest } = req.files[key];

                    if (!Buffer.isBuffer(buffer)) {

                        throw new Error(`the file ${originalname}, does not a valid buffer`);

                    };

                    const extName = extname(originalname);

                    const newName = originalname.replace(extName, `${UUIDAdapter.get()}-${Date.now()}`);

                    const uniqueName = `${newName}${extName}`;

                    postOrder.items[index].content.pictures.push(
                        {
                            ...fileRest,
                            mimeType: mimetype,
                            buffer,
                            uniqueName,
                        }
                    );

                };

            });

        req.body = postOrder;

    };

};