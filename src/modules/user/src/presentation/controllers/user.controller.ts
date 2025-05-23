import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import Request from "src/modules/shared/src/types/types";
import CompleteEmailIdvUseCase from "../../application/useCases/complete.email.idv.use.case";
import CreateOrUpdateUserNotificationTokenUseCase from "../../application/useCases/create.or.update.user.notification.token.use.case";
import CreateUserUseCase from "../../application/useCases/create.user.use.case";
import DeleteUserUseCase from "../../application/useCases/delete.user.use.case";
import GetAllUsersUseCase from "../../application/useCases/get.all.users.use.case";
import GetOneUserUseCase from "../../application/useCases/get.one.user.use.case";
import InitiateEmailIdvUseCase from "../../application/useCases/initiate.email.idv.use.case";
import InviteUserToCompanyUseCase from "../../application/useCases/invite.user.to.company.use.case";
import RespondToCompanyInvitationUseCase from "../../application/useCases/respond.to.company.invitation.use.case";
import { IdentityEnum } from "../../domain/enums/identity.enum";
import completeIdvBodyOptions from "../docs/bodies/complete.idv.body.options";
import createUserBodyOptions from "../docs/bodies/create.user.body.options";
import initiateIdvBodyOptions from "../docs/bodies/initiate.idv.body.options";
import inviteUserToCompanyBodyOptions from "../docs/bodies/invite.user.to.company.body.options";
import respondToCompanyInvitationBodyOptions from "../docs/bodies/respond.to.company.invitation.body.options";
import setUserNotificationTokenBodyOptions from "../docs/bodies/set.user.notification.token.body.options";
import { ApiCompleteIdvProcessResponse } from "../docs/decorators/api.complete.idv.process.response";
import { ApiGetAllUsersResponse } from "../docs/decorators/api.get.all.users.response";
import { ApiInitiateIdvProcessResponse } from "../docs/decorators/api.initiate.idv.process.response";
import { ApiSetUserNotificationTokenResponse } from "../docs/decorators/api.set.user.notification.token.response";
import { ApiInviteUserToCompanyResponse } from "../docs/decorators/invite.user.to.company.response";
import { ApiRespondToCompanyInvitationResponse } from "../docs/decorators/respond.to.company.invitation.response";
import completeIdvOperationOptions from "../docs/operations/complete.idv.operation.options";
import createUserOperationOptions from "../docs/operations/create.user.operation.options";
import deleteUserOperationOptions from "../docs/operations/delete.user.operation.options";
import getAllUsersOperationOptions from "../docs/operations/get.all.users.operation.options";
import getOneUserOperationOptions from "../docs/operations/get.one.user.operation.options";
import initiateIdvOperationOptions from "../docs/operations/initiate.idv.operation.options";
import inviteUserToCompanyOperationOptions from "../docs/operations/invite.user.to.company.operation.options";
import respondToCompanyInvitationOperationOptions from "../docs/operations/respond.to.company.invitation.operation.options";
import setUserNotificationTokenOperationOptions from "../docs/operations/set.user.notification.token.operation.options";
import userIdParamOptions from "../docs/params/user.id.param.options";
import { ApiCreateUserResponse } from "../docs/responses/api.create.user.response";
import { ApiDeleteOneUserResponse } from "../docs/responses/api.delete.one.user.response";
import { ApiGetOneUserResponse } from "../docs/responses/api.get.one.user.response";
import CompleteUserIdvRequestBody from "../dtos/complete.user.idv.request.body";
import CreateUserDto from "../dtos/create.user.dto";
import InitiateUserIdvRequestBody from "../dtos/initiate.user.idv.request.body";
import InviteJoinCompanyRequestBody from "../dtos/invite.user.to.company.request.body";
import RespondToCompanyInvitationRequestBody from "../dtos/respond.to.company.invitation.request.body";
import SetUserNotificationTokenRequestBody from "../dtos/set.user.notification.token.request.body";

@ApiTags('users')
@Controller({
    path: "users"
})
export default class UserController {

    public constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly getOneUserUseCase: GetOneUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly initiateEmailIdvUseCase: InitiateEmailIdvUseCase,
        private readonly completeEmailIdvUseCase: CompleteEmailIdvUseCase,
        private readonly inviteUserToCompanyUseCase: InviteUserToCompanyUseCase,
        private readonly respondToCompanyInvitationUseCase: RespondToCompanyInvitationUseCase,
        private readonly createOrUpdateUserNotificationTokenUseCase: CreateOrUpdateUserNotificationTokenUseCase,
    ) { };

    @ApiOperation(getAllUsersOperationOptions)
    @ApiGetAllUsersResponse()
    @Get('')
    public async getUsers() {

        try {

            const res = await this.getAllUsersUseCase.execute();

            return res;

        } catch (error) {

            throw error;

        };

    };

    @ApiOperation(getOneUserOperationOptions)
    @ApiParam(userIdParamOptions)
    @ApiGetOneUserResponse()
    @Get('/:id')
    public async getUser(
        @Param('id') userId: string,
    ) {

        try {

            const res = await this.getOneUserUseCase.execute(userId);

            return res;

        } catch (error) {

            throw error;

        };

    };

    @ApiOperation(createUserOperationOptions)
    @ApiBody(createUserBodyOptions)
    @ApiCreateUserResponse()
    @Post('')
    public async create(
        @Body() body: CreateUserDto,
    ) {

        const {
            user,
            credential,
            identities,
        } = body;

        try {

            const res = await this.createUserUseCase.execute(
                {
                    user,
                    credential,
                    identities,
                }
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

    @ApiOperation(deleteUserOperationOptions)
    @ApiParam(userIdParamOptions)
    @ApiDeleteOneUserResponse()
    @Delete('/:id')
    public async delete(
        @Param('id') userId: string,
    ) {

        try {

            const res = await this.deleteUserUseCase.execute(userId);

            return res;

        } catch (error) {

            throw error;

        };

    };

    @ApiOperation(initiateIdvOperationOptions)
    @ApiBody(initiateIdvBodyOptions)
    @ApiInitiateIdvProcessResponse()
    @Post('/idv/initiate')
    public async initiateUserIdv(
        @Req() req: Request,
        @Body() body: InitiateUserIdvRequestBody,
        @Res() res: Response,
    ) {

        const {
            type,
            value,
        } = body;

        try {

            if (type === IdentityEnum.EMAIL) {

                await this.initiateEmailIdvUseCase.execute(
                    {
                        userId: req.user.id,
                        email: value,
                    }
                );

                return res
                    .status(200)
                    .json(
                        {
                            message: 'idv proccess initiated successfully'
                        }
                    );

            };

        } catch (error) {

            throw error;

        };

    };

    @ApiOperation(completeIdvOperationOptions)
    @ApiBody(completeIdvBodyOptions)
    @ApiCompleteIdvProcessResponse()
    @Post('/idv/complete')
    public async completeUserIdv(
        @Req() req: Request,
        @Body() body: CompleteUserIdvRequestBody,
        @Res() res: Response,
    ) {

        const {
            type,
            value,
            key,
        } = body;

        try {

            if (type === IdentityEnum.EMAIL) {

                await this.completeEmailIdvUseCase.execute(
                    {
                        userId: req.user.id,
                        email: value,
                        key,
                    }
                );

                return res
                    .status(200)
                    .json(
                        {
                            message: 'idv proccess completed successfully'
                        }
                    );

            };

        } catch (error) {

            throw error;

        };

    };

    @ApiOperation(inviteUserToCompanyOperationOptions)
    @ApiBody(inviteUserToCompanyBodyOptions)
    @ApiInviteUserToCompanyResponse()
    @Post('/companies/invitations')
    public async joinCompanyInvitation(
        @Req() req: Request,
        @Body() body: InviteJoinCompanyRequestBody,
        @Res() res: Response,
    ) {

        const {
            role,
            inviteeId,
            email,
        } = body;

        try {

            await this.inviteUserToCompanyUseCase.execute(
                {
                    inviterId: req.user.id,
                    inviteeId,
                    role,
                }
            );

            return res
                .status(201)
                .json(
                    {
                        message: 'invitation completed successfully'
                    }
                );

        } catch (error) {

            throw error;

        };

    };

    @ApiOperation(respondToCompanyInvitationOperationOptions)
    @ApiBody(respondToCompanyInvitationBodyOptions)
    @ApiRespondToCompanyInvitationResponse()
    @Post('/companies/invitations/respond')
    public async respondCompanyInvitation(
        @Req() req: Request,
        @Body() body: RespondToCompanyInvitationRequestBody,
        @Res() res: Response,
    ) {

        const {
            token,
            status
        } = body;

        try {

            await this.respondToCompanyInvitationUseCase.execute(
                {
                    token,
                    status
                }
            );

            return res
                .status(200)
                .json(
                    {
                        message: 'response received successfully'
                    }
                );

        } catch (error) {

            return error;

        };

    };

    @ApiOperation(setUserNotificationTokenOperationOptions)
    @ApiBody(setUserNotificationTokenBodyOptions)
    @ApiSetUserNotificationTokenResponse()
    @Post('/notifications/tokens')
    public async createNotificationToken(
        @Req() req: Request,
        @Body() body: SetUserNotificationTokenRequestBody,
        @Res() res: Response
    ) {

        try {

            await this.createOrUpdateUserNotificationTokenUseCase.execute(
                {
                    userId: req.user.id,
                    platform: body.platform,
                    token: body.token,
                }
            );

            return res
                .status(201)
                .json({ message: 'notification token set successfully' });

        } catch (error) {

            return error;

        };

    };

    @Put('/notifications/tokens')
    public async updateNotificationToken() { };

};