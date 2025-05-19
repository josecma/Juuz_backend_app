// import { Inject, Injectable } from "@nestjs/common";
// import EvidenceRepository from "../infrastructure/evidence.repository";

// @Injectable({})
// export default class UpdateEvidenceService {

//     public constructor(
//         @Inject(EvidenceRepository)
//         private readonly evidenceRepository: EvidenceRepository,
//         @Inject(FindOneUserByService)
//         private readonly findOneUserByService: FindOneUserByService,
//         @Inject(FindOneOrderByService)
//         private readonly findOneOrderByService: FindOneOrderByService,
//     ) { };

//     public async execute(params: {
//         userId: string;
//         orderId: string;
//         description: string;
//         coordinates: {
//             longitude: number;
//             latitude: number;
//         }; files: {
//             fileName: string;
//             key: string;
//             buffer: Buffer;
//             mimeType: string;
//             metadata?: Record<string, any>;
//         }[],
//     }) {

//         const { userId, orderId, coordinates, files, description } = params;

//         try {

//             const user = await this.findOneUserByService.execute({ id: userId });

//             if (user === null) {

//                 throw new NotFoundException(`user with id:${userId} does not exists`);

//             };

//             const order = await this.findOneOrderByService.execute({ id: orderId });

//             if (order === null) {

//                 throw new NotFoundException(`order with id:${orderId} does not exists`);

//             };

//             const departure = {
//                 longitude: +order.departure.longitude,
//                 latitude: +order.departure.latitude,
//             };

//             const distance = this.geoJsonAdapter.distance({
//                 p1: departure,
//                 p2: coordinates
//             });

//             if (order.driverId !== user.id && order.ownerId !== user.id) {

//                 throw new UnauthorizedException(`the user with id ${user.id}, cannot upload evidences related to the order with id ${order.id}`);

//             };

//             if (distance <= this.radius) {

//                 const newGeoPoint = new GeoPoint(coordinates);

//                 const newFiles = files.map((file) => new File(file));

//                 const newEvidence = new Evidence({
//                     description: description,
//                     geoPoint: newGeoPoint,
//                     files: newFiles,
//                 });

//                 await this.evidenceRepository.save({
//                     userId: userId,
//                     orderId: orderId,
//                     evidence: newEvidence,
//                 });

//             } else {

//                 throw new UnauthorizedException(`You must be at least ${this.radius} meters from the starting point.`);

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