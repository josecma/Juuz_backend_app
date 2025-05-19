// import { Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
// import FindOneOrderByService from "src/modules/order/src/application/find.one.order.by.service";
// import UpdateOrderService from "src/modules/order/src/application/update.order.service";
// import IGeoService from "src/modules/shared/src/application/ports/i.geo.service";
// import File from "src/modules/shared/src/domain/file";
// import GeoPoint from "src/modules/shared/src/domain/valueObjects/geo.point";
// import GeoAdapter from "src/modules/shared/src/infrastructure/adapters/geo.adapter";
// import FindOneUserByService from "src/modules/user/src/application/find.one.user.by.service";
// import Evidence from "../domain/evidence";
// import EvidenceRepository from "../infrastructure/evidence.repository";

// @Injectable({})
// export default class CreateEvidenceService {

//     private readonly radius = 200;

//     public constructor(
//         @Inject(EvidenceRepository)
//         private readonly evidenceRepository: EvidenceRepository,
//         @Inject(FindOneUserByService)
//         private readonly findOneUserByService: FindOneUserByService,
//         @Inject(FindOneOrderByService)
//         private readonly findOneOrderByService: FindOneOrderByService,
//         @Inject(UpdateOrderService)
//         private readonly updateOrderService: UpdateOrderService,
//         @Inject(GeoAdapter)
//         private readonly geoAdapter: IGeoService,
//     ) { };

//     public async create(params: {
//         userId: string;
//         orderId: string;
//         description: string;
//         of: "DEPARTURE" | "DESTINATION",
//         coordinates: {
//             longitude: number;
//             latitude: number;
//         }; files: {
//             key: string;
//             mimeType: string;
//             size: number;
//             metadata?: Record<string, any>;
//         }[],
//     }) {

//         const { userId, orderId, coordinates, files, description, of } = params;

//         try {

//             const user = await this.findOneUserByService.execute({ id: userId });

//             const order = await this.findOneOrderByService.execute({ id: orderId });

//             const departure = {
//                 longitude: Number(order.departure.longitude),
//                 latitude: Number(order.departure.latitude),
//             };

//             const distance = this.geoAdapter.distance({
//                 p1: departure,
//                 p2: coordinates
//             });

//             if (order.driverId !== user.id && order.ownerId !== user.id) {

//                 throw new UnauthorizedException(`the user with id ${user.id}, cannot upload evidences related to the order with id ${order.id}`);

//             };

//             const newGeoPoint = new GeoPoint(coordinates);

//             const newFiles = files.map((file) => new File(file));

//             const newEvidence = new Evidence({
//                 description,
//                 geoPoint: newGeoPoint,
//                 files: newFiles,
//                 of,
//             });

//             await this.evidenceRepository.save({
//                 userId: userId,
//                 orderId: orderId,
//                 evidence: newEvidence,
//             });

//             if (of === 'DEPARTURE') {

//                 await this.updateOrderService.execute({
//                     id: order.id as unknown as string,
//                     updateObj: {
//                         subStatus: "PICKUP",
//                     }
//                 });

//             };

//             if (distance <= this.radius) {

//                 return { warning: `You must be at least ${this.radius} meters from the starting point.` };

//             };

//         } catch (error) {

//             if (error instanceof NotFoundException) {

//                 throw error;

//             };

//             if (error instanceof UnauthorizedException) {

//                 throw error;

//             };

//             throw new InternalServerErrorException(error);

//         };

//     };

// };