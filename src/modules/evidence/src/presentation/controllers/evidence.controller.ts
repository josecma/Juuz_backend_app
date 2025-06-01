import { Body, Controller, DefaultValuePipe, Get, Inject, Param, ParseIntPipe, Post, Query, Request, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { extname } from "path";
import { RequestUserId } from "src/_shared/domain/requestId";
import IdDto from "src/modules/shared/src/presentation/dtos/id.dto";
import CreateEvidenceUseCaseContract from "../../application/contracts/useCases/create.evidence.use.case.contract";
import CreateEvidenceUseCase from "../../application/useCases/create.evidence.use.case";
import FindEvidenceByOrderIdUseCase from "../../application/useCases/find.evidence.by.order.id.use.case";
import VerifyEvidenceUseCase from "../../application/useCases/verify.evidence.use.case";
import CreateEvidenceDto from "../dtos/create.evidence.dto";
import FormDataInterceptor from "../interceptors/form.data.interceptor";

@ApiBearerAuth()
@ApiTags("evidences")
@Controller(
    {
        path: "evidences"
    }
)
export default class EvidenceController {

    public constructor(
        @Inject(CreateEvidenceUseCase)
        private readonly createEvidenceUseCase: CreateEvidenceUseCaseContract,
        @Inject(FindEvidenceByOrderIdUseCase)
        private readonly findEvidenceByOrderIdUseCase: FindEvidenceByOrderIdUseCase,
        @Inject(VerifyEvidenceUseCase)
        private readonly verifyEvidenceUseCase: VerifyEvidenceUseCase,
    ) { };

    @Post()
    @ApiOperation({
        summary: "create a new evidence",
        description: "Endpoint to create a new evidence with files and metadata",
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: CreateEvidenceDto, description: "Request body data required to create a new evidence" })
    @UseInterceptors(FilesInterceptor('files'), FormDataInterceptor)
    public async createLocationEvidence(
        @Request() req: RequestUserId,
        @Body() body: CreateEvidenceDto,
        @UploadedFiles() files: Array<Express.Multer.File>,
    ) {

        const { orderId, coords, description, type } = body;

        try {

            const fileArr = files.map(file => {

                if (!Buffer.isBuffer(file.buffer)) {
                    throw new Error(`the file ${file.originalname}, does not a valid buffer`);
                };

                const extName = extname(file.originalname);

                const newName = file.originalname.replace(extName, `-${Date.now()}`);

                const key = `${newName}${extName}`;

                return {
                    fileName: file.filename,
                    key: key,
                    buffer: file.buffer,
                    mimeType: file.mimetype,
                };

            });

            await this.createEvidenceUseCase.execute({
                userId: req.user.id.toString(),
                orderId: orderId.toString(),
                description: description,
                coordinates: coords,
                files: fileArr,
                type,
            });

            return { msg: 'evidence created successfully' };

        } catch (error) {

            return { err: `${error.message}` };

        };

    };

    @ApiOperation({
        summary: "Verify an evidence",
        description: "Endpoint to verify an evidence",
    })
    @ApiBody({ type: IdDto, description: "evidence id" })
    @Post('verify')
    public async verifyEvidence(
        @Request() req: RequestUserId,
        @Body() body: IdDto,
    ) {

        const { id } = body;

        const { user } = req;

        try {

            await this.verifyEvidenceUseCase.execute({
                userId: user.id.toString(),
                evidenceId: id.toString(),
            });

            return { msg: 'evidence verified successfully' };

        } catch (error) {

            return { err: `${error.message}` };

        };

    };

    @ApiOperation({
        summary: "Get evidences related to a order",
        description: "Endpoint to get evidences related to a order",
    })
    @ApiQuery({
        name: 'page',
        type: Number,
        required: false,
        description: 'Page number (starts at 1)',
        example: 1,
    })
    @ApiQuery({
        name: 'limit',
        type: Number,
        required: false,
        description: 'Number of items per page',
        example: 10,
    })
    @ApiParam({
        name: "id",
        type: String,
        required: true,
        description: "order id",
        example: "2",
    })
    @Get('/find/:id')
    public async findOrderEvidences(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Request() req: RequestUserId,
        @Param('id') id: string,
    ) {

        const { user } = req;

        try {

            return await this.findEvidenceByOrderIdUseCase.execute({
                orderId: id.toString(),
                userId: user.id.toString(),
                pagination: {
                    page,
                    limit,
                }
            });

        } catch (error) {

            return { err: `${error.message}` };

        };

    };

};