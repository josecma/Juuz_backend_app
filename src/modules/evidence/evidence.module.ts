import { Module } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import OrderModule from "../order/order.module";
import SharedModule from "../shared/shared.module";
import GeoAdapter from "../shared/src/infrastructure/adapters/geo.adapter";
import UserModule from "../user/user.module";
import CreateEvidenceUseCase from "./src/application/useCases/create.evidence.use.case";
import CreateEvidenceService from "./src/domain/services/create.evidence.service";
import FindOneEvidenceByIdService from "./src/domain/services/find.one.evidence.by.id.service";
import VerifyEvidenceService from "./src/domain/services/verify.evidence.service";
import EvidenceRepository from "./src/infrastructure/evidence.repository";
import EvidenceController from "./src/presentation/controllers/evidence.controller";
import FindEvidenceByOrderIdUseCase from "./src/application/useCases/find.evidence.by.order.id.use.case";
import FindEvidenceByOrderIdService from "./src/domain/services/find.evidence.by.order.id.service";
import VerifyEvidenceUseCase from "./src/application/useCases/verify.evidence.use.case";

@Module({
    imports: [DatabaseModule, SharedModule, OrderModule, UserModule],
    controllers: [EvidenceController],
    providers: [
        EvidenceRepository,
        CreateEvidenceUseCase,
        CreateEvidenceService,
        VerifyEvidenceService,
        FindOneEvidenceByIdService,
        FindEvidenceByOrderIdService,
        FindEvidenceByOrderIdUseCase,
        VerifyEvidenceUseCase,
        GeoAdapter,
    ],
    exports: [EvidenceRepository],
})
export default class EvidenceModule { };