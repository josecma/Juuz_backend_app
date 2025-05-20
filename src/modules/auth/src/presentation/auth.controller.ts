import { Body, Controller, Inject, Logger, Post, Res } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import CompleteOtpAuthByEmailUseCase from "../application/useCases/complete.otp.auth.by.email.use.case";
import InitiateOtpAuthByEmailUseCase from "../application/useCases/initiate.otp.auth.by.email.use.case";
import { Public } from "./decorators/public.route.decorator";
import completeOtpAuthnBodyOptions from "./docs/bodies/complete.otp.authn.body.options";
import initiateOtpAuthnBodyOptions from "./docs/bodies/initiate.otp.authn.body.options";
import { ApiCompleteOtpAuthnResponse } from "./docs/decorators/api.complete.otp.authn.response";
import { ApiInitiateOtpAuthnResponse } from "./docs/decorators/api.initiate.otp.authn.response";
import completeOtpAuthnOperationOptions from "./docs/operations/complete.otp.authn.operation.options";
import initiateOtpAuthnOperationOptions from "./docs/operations/initiate.otp.authn.operation.options";
import CompleteOtpAuthRequestBody from "./dtos/complete.otp.auth.request.body";
import InitiateOtpAuthRequestBody from "./dtos/initiate.otp.auth.request.body";

@ApiTags('auth')
@Public()
@Controller(
    {
        path: '/auth'
    }
)
export default class AuthController {

    private readonly logger = new Logger(AuthController.name);

    public constructor(
        @Inject(InitiateOtpAuthByEmailUseCase)
        private readonly initiateOtpAuthByEmailUseCase: InitiateOtpAuthByEmailUseCase,
        @Inject(CompleteOtpAuthByEmailUseCase)
        private readonly completeOtpAuthByEmailUseCase: CompleteOtpAuthByEmailUseCase,
    ) { };

    @ApiOperation(initiateOtpAuthnOperationOptions)
    @ApiBody(initiateOtpAuthnBodyOptions)
    @ApiInitiateOtpAuthnResponse()
    @Post('/otp/initiate')
    public async otpInitiate(
        @Body() body: InitiateOtpAuthRequestBody,
        @Res() res: Response,
    ) {

        const {
            phoneNumber,
            email,
        } = body;

        try {

            let initiateOtpAuth = null;

            if (email && !phoneNumber) {
                initiateOtpAuth = await this.initiateOtpAuthByEmailUseCase.execute(
                    email,
                );
            };

            return res
                .status(200)
                .json(initiateOtpAuth);

        } catch (error) {

            this.logger.error(error);

            return res
                .status(500)
                .json(error);

        };

    };

    @ApiOperation(completeOtpAuthnOperationOptions)
    @ApiBody(completeOtpAuthnBodyOptions)
    @ApiCompleteOtpAuthnResponse()
    @Post('/otp/complete')
    public async otpComplate(
        @Body() body: CompleteOtpAuthRequestBody,
        @Res() res: Response,
    ) {

        const {
            phoneNumber,
            email,
            key,
        } = body;

        try {

            let completeOtpAuth = null;

            if (email && !phoneNumber) {
                completeOtpAuth = await this.completeOtpAuthByEmailUseCase.execute(
                    {
                        email,
                        key,
                    }
                );
            };

            return res
                .status(200)
                .json(completeOtpAuth);

        } catch (error) {

            this.logger.error(error);

            return res
                .status(500)
                .json(error);

        };

    };

};