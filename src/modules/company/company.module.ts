import { forwardRef, Inject, Module, OnModuleInit } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import UserEvaluationCreatedEvent from "../performance/src/domain/events/user.evaluation.created.event";
import SharedModule from "../shared/shared.module";
import IEventDispatcher from "../shared/src/application/contracts/i.event.dispatcher";
import IEventHandler from "../shared/src/application/contracts/i.event.handler";
import { EventDispatcher } from "../shared/src/infrastructure/event.dispatcher";
import UserEvaluationCreatedHandler from "./src/application/eventHandlers/user.evaluation.created.handler";
import UserCompanyRepository from "../user/src/infrastructure/repositories/user.company.repository";
import UpdateCompanyScoreService from "./src/domain/services/update.company.score.service";
import DoesCompanyExistRepository from "./src/infrastructure/repositories/does.company.exist.repository";
import CompanyReadRepository from "./src/infrastructure/repositories/company.read.repository";
import CompanyWriteRepository from "./src/infrastructure/repositories/company.write.repository";
import FindCompanyByOwnerIdService from "./src/domain/services/find.user.company.by.user.id.service";

@Module(
    {
        imports: [
            DatabaseModule,
            forwardRef(() => SharedModule),
        ],
        controllers: [],
        providers: [
            UserEvaluationCreatedHandler,
            UpdateCompanyScoreService,
            UserCompanyRepository,
            DoesCompanyExistRepository,
            CompanyReadRepository,
            CompanyWriteRepository,
            FindCompanyByOwnerIdService,
        ],
        exports: [
            CompanyReadRepository,
            CompanyWriteRepository,
            FindCompanyByOwnerIdService,
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