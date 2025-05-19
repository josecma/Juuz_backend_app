import { Inject } from "@nestjs/common";
import { CompanyScore } from "src/modules/company/src/domain/types";
import OrderReadRepository from "src/modules/order/src/infrastructure/repositories/order.read.repository";
import AverageEvaluationByCriterionRepository from "src/modules/performance/src/infrastructure/repositories/average.evaluation.by.criterion.repository";
import AverageEvaluationByEvaluationRepository from "src/modules/performance/src/infrastructure/repositories/average.evaluation.by.evaluation.repository";
import AverageEvaluationByRoleRepository from "src/modules/performance/src/infrastructure/repositories/average.evaluation.by.role.repository";
import CountUserReviewRepository from "src/modules/performance/src/infrastructure/repositories/count.user.review.repository";
import { RoleType } from "src/modules/shared/src/domain/enums/role.type";
import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
import { UserRoleEnum } from "../../domain/enums/user.role.enum";
import FindOneUserByIdService from "../../domain/services/find.one.user.by.id.service";
import UserCompanyRepository from "../../infrastructure/repositories/user.company.repository";
import UserVehicleRepository from "../../infrastructure/repositories/user.vehicle.repository";

export default class GetUserDetailUseCase {

    public constructor(
        @Inject(FindOneUserByIdService)
        private readonly findOneUserByIdService: FindOneUserByIdService,
        @Inject(UserCompanyRepository)
        private readonly userCompanyRepository: UserCompanyRepository,
        @Inject(UserVehicleRepository)
        private readonly userVehicleRepository: UserVehicleRepository,
        @Inject(AverageEvaluationByRoleRepository)
        private readonly averageEvaluationByRoleRepository: AverageEvaluationByRoleRepository,
        @Inject(AverageEvaluationByEvaluationRepository)
        private readonly averageEvaluationByEvaluationRepository: AverageEvaluationByEvaluationRepository,
        @Inject(AverageEvaluationByCriterionRepository)
        private readonly averageEvaluationByCriterionRepository: AverageEvaluationByCriterionRepository,
        @Inject(CountUserReviewRepository)
        private readonly countUserReviewRepository: CountUserReviewRepository,
        @Inject(OrderReadRepository)
        private readonly orderReadRepository: OrderReadRepository,
    ) { };

    public async execute(
        params: {
            userId: string;
            role: RoleType;
            include?: Record<string, boolean>;
        }
    ) {

        const {
            userId,
            role,
            include,
        } = params;

        try {

            if (!userId) {
                throw new BadRequestDomainException(
                    {
                        message: `user id is required`,
                        source: `${GetUserDetailUseCase.name}`,
                    }
                );
            };

            if (!role) {
                throw new BadRequestDomainException(
                    {
                        message: `role is required`,
                        source: `${GetUserDetailUseCase.name}`,
                    }
                );
            };

            const reviewCounter = await this.countUserReviewRepository.count(
                {
                    userId,
                    role,
                }
            );

            const userById = await this.findOneUserByIdService.find({ id: userId });

            const userCompany = await this.userCompanyRepository.findUserCompanyByUserId({ userId });

            const { score, ...userCompanyRes } = userCompany[0];

            const { userPoint, channels, ...userRes } = userById;

            const groupAndCountOrderStatusRes =
                await this.orderReadRepository.groupAndCountStatesByUserId(
                    {
                        userId,
                        userRole: role as unknown as UserRoleEnum,
                    }
                );


            const userDetails = Object.assign(
                {},
                (!include || include?.user === true) && { user: userRes },
                (!include || include?.company === true) && {
                    company: {
                        ...userCompanyRes,
                        score: (score as CompanyScore) ? (score as CompanyScore).lastAvg : 0,
                    }
                },
                (!include || include?.vehicles === true) && {
                    vehicles: await this.userVehicleRepository.findUserVehicleByUserId({ userId }),
                },
                (!include || include?.averageEvaluationByRole === true) && {
                    averageEvaluationByRole: (reviewCounter > 0) ? await this.averageEvaluationByRoleRepository.find({ userId, role }) : null,
                },
                (!include || include?.averageEvaluationByCriterion === true) && {
                    averageEvaluationByCriterion: (reviewCounter > 0) ? await this.averageEvaluationByCriterionRepository.find({ userId, role }) : null,
                },
                (!include || include?.averageEvaluationByEvaluation === true) && {
                    averageEvaluationByEvaluation: (reviewCounter > 0) ? await this.averageEvaluationByEvaluationRepository.find({ userId, role, limit: 10 }) : null,
                },
                (!include || include?.groupAndCountOrderStatus === true) && {
                    groupAndCountOrderStatus: Object.fromEntries(groupAndCountOrderStatusRes.map((e) => { return [e.status, e.counter] })),
                }
            );

            return {
                msg: "user details getting successfully",
                content: userDetails,
            };

        } catch (error) {

            throw error;

        };

    };

};