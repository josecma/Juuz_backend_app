import { BadRequestException, Body, ConflictException, Controller, Get, Inject, InternalServerErrorException, NotFoundException, Param, Patch, Post, Query, Request } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { RequestUserId } from "src/_shared/domain/requestId";
import { RoleType } from "src/modules/shared/src/domain/enums/role.type";
import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
import DomainException from "src/modules/shared/src/domain/exceptions/domain.exception";
import DuplicateKeyException from "src/modules/shared/src/domain/exceptions/duplicate.key.exception";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import { UserRoleEnum } from "src/modules/user/src/domain/enums/user.role.enum";
import UserRoleDto from "src/modules/user/src/presentation/dtos/user.role.dto";
import CreateCriterionSetUseCase from "../../application/useCases/create.criterion.set.use.case";
import CreateCriterionUseCase from "../../application/useCases/create.criterion.use.case";
import CreateEvaluationUseCase from "../../application/useCases/create.evaluation.use.case";
import DefaultCriterionSetUseCase from "../../application/useCases/default.criterion.set.use.case";
import FindUserEvaluationUseCase from "../../application/useCases/find.user.evaluation.use.case";
import { CriterionJSON } from "../../domain/types";
import CriterionRepository from "../../infrastructure/repositories/criterion.repository";
import CriterionSetRepository from "../../infrastructure/repositories/criterion.set.repository";
import { CreateCriterionDto } from "../dtos/create.criterion.dto";
import { CriterionSetDto } from "../dtos/create.criterion.set.dto";
import { CreateEvaluationDto } from "../dtos/create.evaluation.dto";
import FindUserEvaluationDto from "../dtos/find.user.details.dto";

@ApiTags('Performance')
@ApiBearerAuth()
@Controller({
    path: "performance"
})
export default class PerformanceController {

    public constructor(
        @Inject(CreateCriterionUseCase)
        private readonly createCriterionUseCase: CreateCriterionUseCase,
        @Inject(CriterionRepository)
        private readonly criterionRepository: CriterionRepository,
        @Inject(CreateCriterionSetUseCase)
        private readonly createCriterionSetUseCase: CreateCriterionSetUseCase,
        @Inject(CriterionSetRepository)
        private readonly criterionSetRepository: CriterionSetRepository,
        @Inject(CreateEvaluationUseCase)
        private readonly CreateEvaluationUseCase: CreateEvaluationUseCase,
        @Inject(FindUserEvaluationUseCase)
        private readonly findUserEvaluationUseCase: FindUserEvaluationUseCase,
        @Inject(DefaultCriterionSetUseCase)
        private readonly defaultCriterionSetUseCase: DefaultCriterionSetUseCase,
    ) { };

    @Get("/criterion/find/")
    @ApiOperation({
        summary: 'Get all criteria',
        description: 'Endpoint to retrieve a list of all criteria stored in the database.',
    })
    @ApiResponse({
        status: 200,
        description: 'List of criteria retrieved successfully',
        type: Array<CriterionJSON>,
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })
    public async findCriteria() {
        try {
            const res = await this.criterionRepository.find({});
            return res.map((e) => e.toJSON());
        } catch (error) {
            throw error;
        };
    };

    @Post("/criterion/")
    @ApiOperation({
        summary: 'Create a new performance criterion',
        description: 'Creates a new evaluation criterion with name, description and maximum score'
    })
    @ApiBody({
        type: CreateCriterionDto,
        description: 'Criterion creation payload',
        examples: {
            basic: {
                summary: 'Basic Criterion',
                value: {
                    name: 'Code Quality',
                    description: 'Measures code maintainability',
                }
            },
            minimal: {
                summary: 'Minimal Criterion',
                value: {
                    name: 'Documentation',
                }
            }
        }
    })
    @ApiCreatedResponse({
        description: 'Criterion successfully created',
        schema: {
            example: {
                id: 1,
                name: 'Code Quality',
                description: 'Measures code maintainability',
                max: 100,
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data',
        schema: {
            example: {
                statusCode: 400,
                message: [
                    'max must not be less than 1',
                    'name must be a string'
                ],
                error: 'Bad Request'
            }
        }
    })
    @ApiUnauthorizedResponse({
        description: 'Missing or invalid authentication token',
        schema: {
            example: {
                statusCode: 401,
                message: 'Unauthorized'
            }
        }
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error',
        schema: {
            example: {
                statusCode: 500,
                message: 'An unexpected error occurred'
            }
        }
    })
    public async createCriterion(
        @Body() body: CreateCriterionDto,
    ) {
        try {
            const res = await this.createCriterionUseCase.execute({
                ...body
            });
            return res;
        } catch (error) {
            if (error instanceof DuplicateKeyException) {
                throw new ConflictException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }

    @Get("/criterion/set/find/")
    @ApiOperation({
        summary: 'Get all criterion set',
        description: 'Endpoint to retrieve a list of all criterion set stored in the database.',
    })
    @ApiResponse({
        status: 200,
        description: 'List of criterion set retrieved successfully',
        type: Array<CriterionJSON>,
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })
    public async findCriterionSet() {
        try {
            const res = await this.criterionSetRepository.find({});
            return res.map((e) => e.toJSON());
        } catch (error) {
            throw error;
        };
    };

    @Patch("/criterion/set/default/:id")
    @ApiOperation(
        {
            summary: "set criteria set as default",
        }
    )
    @ApiParam(
        {
            name: "id",
            example: "1",
            required: true,
        }
    )
    @ApiBody(
        {
            enum: UserRoleEnum,
            required: true,
        }
    )
    public async defaultCriterionSet(
        @Param('id') id: string,
        @Body() body: UserRoleDto,
    ) {

        try {

            return await this.defaultCriterionSetUseCase.execute(
                {
                    criterionSetId: id,
                    userRole: body.name
                }
            );

        } catch (error) {

            if (error instanceof DomainException) {
                if (error instanceof NotFoundDomainException) {
                    throw new NotFoundException(
                        error.toJSON()
                    )
                };
                if (error instanceof BadRequestDomainException) {
                    throw new BadRequestException(
                        error.toJSON()
                    )
                };
            };

            throw error;

        };

    };

    @Post("/criterion/set/")
    @ApiOperation({
        summary: 'Create a new criteria set',
        description: 'Creates a new evaluation criteria set with name, description and ordered criteria'
    })
    @ApiBody({
        type: CriterionSetDto,
        description: 'Criteria set creation payload',
        examples: {
            basic: {
                summary: 'Complete Criteria Set',
                value: {
                    name: 'Technical Skills',
                    description: 'Evaluates developer technical capabilities',
                    criteria: [[1, 10], [2, 20]]
                }
            },
            minimal: {
                summary: 'Minimal Criteria Set',
                value: {
                    name: 'Soft Skills',
                    criteria: [[1, 5]]
                }
            }
        }
    })
    @ApiCreatedResponse({
        description: 'Criteria set successfully created',
        schema: {
            example: {
                id: 1,
                name: 'Technical Skills',
                description: 'Evaluates developer technical capabilities',
                criteria: [[1, 10], [3, 20]],
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data',
        schema: {
            example: {
                statusCode: 400,
                message: [
                    'criteria must be an array',
                    'Each criteria item must be a tuple of [order, criterionId]'
                ],
                error: 'Bad Request'
            }
        }
    })
    @ApiUnauthorizedResponse({
        description: 'Missing or invalid authentication token',
        schema: {
            example: {
                statusCode: 401,
                message: 'Unauthorized'
            }
        }
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error',
        schema: {
            example: {
                statusCode: 500,
                message: 'Failed to create criteria set'
            }
        }
    })
    public async createCriterionSet(
        @Body() body: CriterionSetDto,
    ) {
        const { criteria, ...bodyRes } = body;

        try {
            const res = await this.createCriterionSetUseCase.execute({
                ...bodyRes,
                criteria: criteria.map(([order, id]) => [order, id.toString()])
            });
            return res;
        } catch (error) {
            if (error instanceof DuplicateKeyException) {
                throw new ConflictException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }

    @Post('/evaluation')
    @ApiOperation({
        summary: 'Create a new evaluation',
        description: 'Creates a new evaluation record with scores for specific criteria'
    })
    @ApiBody({
        type: CreateEvaluationDto,
        description: 'Evaluation creation payload',
        examples: {
            complete: {
                summary: 'Complete Evaluation',
                value: {
                    evaluatedId: 3,
                    evaluation: {
                        role: RoleType.SHIPPER,
                        scores: [
                            {
                                id: 2,
                                value: 5,
                                comment: 'Excellent code structure'
                            },
                            {
                                name: 'System Design',
                                value: 4
                            }
                        ]
                    }
                }
            },
            minimal: {
                summary: 'Minimal Evaluation',
                value: {
                    evaluatedId: 2,
                    evaluation: {
                        role: RoleType.SHIPPER,
                        scores: [
                            {
                                name: 'puntuality',
                                value: 3
                            }
                        ]
                    }
                }
            }
        }
    })
    @ApiCreatedResponse({
        description: 'Evaluation successfully created',
        schema: {
            example: {
                evaluation: {
                    id: 1,
                    role: RoleType.SHIPPER,
                    scores: [
                        {
                            name: 'Code Quality',
                            value: 5,
                            comment: 'Excellent'
                        }
                    ]
                },
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data',
        schema: {
            example: {
                statusCode: 400,
                message: [
                    'criterionSetId must be a string',
                    'evaluatedId must be a string',
                    'Each score value must be between 1 and 100'
                ],
                error: 'Bad Request'
            }
        }
    })
    @ApiUnauthorizedResponse({
        description: 'Missing or invalid authentication token',
        schema: {
            example: {
                statusCode: 401,
                message: 'Unauthorized'
            }
        }
    })
    @ApiNotFoundResponse({
        description: 'Related resource not found',
        schema: {
            example: {
                statusCode: 404,
                message: 'Criterion set not found'
            }
        }
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error',
        schema: {
            example: {
                statusCode: 500,
                message: 'Failed to create evaluation record'
            }
        }
    })
    async createEvaluation(
        @Request() req: RequestUserId,
        @Body() body: CreateEvaluationDto,
    ) {

        const { evaluatedId, evaluation } = body;

        try {

            const res = await this.CreateEvaluationUseCase.execute({
                evaluatedId,
                evaluatorId: req.user.id.toString(),
                evaluation,
            });

            return res;

        } catch (error) {

            if (error instanceof DomainException) {

                if (error instanceof BadRequestDomainException) {
                    throw new BadRequestException(
                        error.toJSON()
                    );
                };
                if (error instanceof NotFoundDomainException) {
                    throw new NotFoundException(
                        error.toJSON()
                    );
                };

            };

            throw error;

        };

    };

    @Get("/evaluation/find/:id")
    @ApiOperation({
        summary: 'find user evaluation by user id',
    })
    @ApiResponse({
        status: 200,
        description: 'Evaluation data retrieved successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        user: {
                            id: 'string',
                            firstName: 'string',
                            lastName: 'string',
                            email: 'string',
                            phone: 'string'
                        },
                        evaluation: {
                            avg: 'number',
                            criteria: [
                                {
                                    name: 'string',
                                    avg: 'number'
                                }
                            ]
                        }
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - Missing or invalid authentication token',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found or no evaluation data available',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error - Detailed error available in server logs',
    })
    @ApiOperation({
        summary: 'Get user evaluation by ID',
        description: 'Retrieves evaluation data for a specified user ID'
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'ID of the user to retrieve evaluation for',
        example: 1,
        required: true
    })
    @ApiQuery({
        name: "role",
        type: FindUserEvaluationDto,
        description: "role type value"
    })
    public async findUserEvaluation(
        @Param('id') id: string,
        @Query() query: FindUserEvaluationDto
    ) {
        try {
            const res = await this.findUserEvaluationUseCase.find(
                {
                    userId: id,
                    role: query.role,
                }
            );
            return res;
        } catch (error) {
            throw error;
        };
    };

}