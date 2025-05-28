import { forwardRef, Inject, Module, OnModuleInit } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import UserEvaluationCreatedEvent from "../performance/src/domain/events/user.evaluation.created.event";
import SharedModule from "../shared/shared.module";
import IEventDispatcher from "../shared/src/application/contracts/i.event.dispatcher";
import IEventHandler from "../shared/src/application/contracts/i.event.handler";
import { EventDispatcher } from "../shared/src/infrastructure/event.dispatcher";
import UserEvaluationCreatedHandler from "./src/application/eventHandlers/user.evaluation.created.handler";
import AddMemberToCompanyUseCase from "./src/application/useCases/add.member.to.company.use.case";
import FindCompanyByOwnerIdUseCase from "./src/application/useCases/find.company.by.owner.use.case";
import UpdateCompanyScoreService from "./src/domain/services/update.company.score.service";
import CompanyMemberReadRepository from "./src/infrastructure/repositories/company.member.read.repository";
import CompanyMemberWriteRepository from "./src/infrastructure/repositories/company.member.write.repository";
import CompanyReadRepository from "./src/infrastructure/repositories/company.read.repository";
import CompanyRoleReadRepository from "./src/infrastructure/repositories/company.role.read.repository";
import CompanyWriteRepository from "./src/infrastructure/repositories/company.write.repository";
import DoesCompanyExistRepository from "./src/infrastructure/repositories/does.company.exist.repository";

@Module(
    {
        imports: [
            DatabaseModule,
            forwardRef(() => SharedModule),
        ],
        controllers: [],
        providers: [
            CompanyMemberReadRepository,
            CompanyRoleReadRepository,
            CompanyMemberWriteRepository,
            UserEvaluationCreatedHandler,
            UpdateCompanyScoreService,
            DoesCompanyExistRepository,
            CompanyReadRepository,
            CompanyWriteRepository,
            FindCompanyByOwnerIdUseCase,
            AddMemberToCompanyUseCase,
        ],
        exports: [
            CompanyReadRepository,
            CompanyWriteRepository,
            FindCompanyByOwnerIdUseCase,
            AddMemberToCompanyUseCase,
        ]
    }
)
export default class CompanyModule implements OnModuleInit {

    public constructor(
        @Inject(EventDispatcher)
        private readonly eventDispatcher: IEventDispatcher,
        @Inject(UserEvaluationCreatedHandler)
        private readonly userEvaluationCreatedHandler: IEventHandler,
    ) { };

    public onModuleInit() {

        this.eventDispatcher.register(
            UserEvaluationCreatedEvent.eventName,
            this.userEvaluationCreatedHandler,
        );

    };

};