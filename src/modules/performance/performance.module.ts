import { forwardRef, Module } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import SharedModule from "../shared/shared.module";
import UserModule from "../user/user.module";
import CreateCriterionSetUseCase from "./src/application/useCases/create.criterion.set.use.case";
import CreateCriterionUseCase from "./src/application/useCases/create.criterion.use.case";
import CreateEvaluationUseCase from "./src/application/useCases/create.evaluation.use.case";
import FindUserEvaluationUseCase from "./src/application/useCases/find.user.evaluation.use.case";
import FindOneCriterionSetByIdService from "./src/domain/services/find.one.criterion.set.by.id.service";
import FindOneCriterionSetByNameService from "./src/domain/services/find.one.criterion.set.by.name.service";
import AverageEvaluationByCriterionRepository from "./src/infrastructure/repositories/average.evaluation.by.criterion.repository";
import AverageEvaluationByEvaluationRepository from "./src/infrastructure/repositories/average.evaluation.by.evaluation.repository";
import AverageEvaluationByRoleRepository from "./src/infrastructure/repositories/average.evaluation.by.role.repository";
import CountUserReviewRepository from "./src/infrastructure/repositories/count.user.review.repository";
import CriterionRepository from "./src/infrastructure/repositories/criterion.repository";
import CriterionSetRepository from "./src/infrastructure/repositories/criterion.set.repository";
import EvaluationRepository from "./src/infrastructure/repositories/evaluation.repository";
import PerformanceController from "./src/presentation/controllers/performance.controller";
import CriterionSetLatestVersionRepository from "./src/infrastructure/repositories/criterion.set.latest.version.repository";
import DefaultCriterionSetUseCase from "./src/application/useCases/default.criterion.set.use.case";
import FindOneCriterionSetByIdAdapter from "./src/infrastructure/adapters/find.one.criterion.set.by.id.adapter";
import DefaultCriterionSetRepository from "./src/infrastructure/repositories/default.criterion.set.repository";
import DefaultCriterionSetReadRepository from "./src/infrastructure/repositories/default.criterion.set.read.repository";

@Module(
    {
        imports: [DatabaseModule, forwardRef(() => UserModule), forwardRef(() => SharedModule)],
        controllers: [PerformanceController],
        providers: [
            CriterionRepository,
            CriterionSetRepository,
            CountUserReviewRepository,
            EvaluationRepository,
            CreateCriterionSetUseCase,
            CreateCriterionUseCase,
            FindOneCriterionSetByNameService,
            CreateEvaluationUseCase,
            FindOneCriterionSetByIdService,
            FindUserEvaluationUseCase,
            AverageEvaluationByRoleRepository,
            AverageEvaluationByEvaluationRepository,
            AverageEvaluationByCriterionRepository,
            CriterionSetLatestVersionRepository,
            DefaultCriterionSetRepository,
            DefaultCriterionSetUseCase,
            FindOneCriterionSetByIdAdapter,
            DefaultCriterionSetReadRepository,
        ],
        exports: [
            AverageEvaluationByRoleRepository,
            AverageEvaluationByEvaluationRepository,
            AverageEvaluationByCriterionRepository,
            CountUserReviewRepository,
        ],
    }
)
export default class PerformanceModule { };
