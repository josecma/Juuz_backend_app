import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { extname } from "path";
import Request from "src/modules/shared/src/types/types";
import CreateVehicleUseCase from "../../application/useCases/create.vehicle.use.case";
import DeleteOneVehicleByIdUseCase from "../../application/useCases/delete.one.vehicle.by.id.use.case";
import FindAllVehiclesUseCase from "../../application/useCases/find.all.vehicles.use.case";
import UpdateVehicleUseCase from "../../application/useCases/update.vehicle.use.case";
import { ApiCreateVehicleDoc } from "../docs/decorators/api.create.vehicle.doc";
import { ApiDeleteOneVehicleByIdDoc } from "../docs/decorators/api.delete.one.vehicle.by.id.doc";
import { ApiFindAllVehiclesDoc } from "../docs/decorators/api.find.all.vehicles.doc";
import CreateVehicleRequestBody from "../dtos/bodies/create.vehicle.request.body";
import UpdateVehicleRequestBody from "../dtos/bodies/update.vehicle.request.body";
import { default as VehicleFormDataInterceptor } from "../interceptors/vehicle.form.data.interceptor";
import FileIdsToDeleteFormDataInterceptor from "../interceptors/file.ids.to.delete.form.data.interceptor";

@ApiBearerAuth()
@ApiTags("vehicles")
@Controller(
    {
        path: "/vehicles"
    }
)
export default class VehicleController {

    public constructor(
        private readonly createVehicleUseCase: CreateVehicleUseCase,
        private readonly findAllVehiclesUseCase: FindAllVehiclesUseCase,
        private readonly deleteOneVehicleByIdUseCase: DeleteOneVehicleByIdUseCase,
        private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    ) { };

    @ApiFindAllVehiclesDoc()
    @Get()
    public async findAll(
        @Res() res: Response,
    ) {

        try {

            const findAllVehiclesResponse = await this.findAllVehiclesUseCase.execute();

            res
                .status(200)
                .json(
                    {
                        message: 'vehicles obtained successfully',
                        payload: findAllVehiclesResponse,
                    }
                );

        } catch (error) {

            res
                .status(500)
                .json(error.message);

        };

    };

    @Patch("/:id")
    @UseInterceptors(
        FilesInterceptor('files'),
        VehicleFormDataInterceptor,
    )
    public async update(
        @Param("id") id: string,
        @Body() body: UpdateVehicleRequestBody,
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Res() res: Response,
    ) {

        const vehicleId = id;

        const {
            modelId,
            deleteIds,
            ...bodyRes
        } = body;

        try {

            const pictures = files?.map(file => {

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

            const updateByIdResponse = await this.updateVehicleUseCase.execute(
                {
                    id: vehicleId,
                    vehicle: bodyRes,
                    files: pictures,
                    modelId,
                    fileIdsToDelete: deleteIds,
                }
            );

            res
                .status(200)
                .json(
                    {
                        message: 'vehicle updated successfully',
                        payload: updateByIdResponse,
                    }
                );

        } catch (error) {

            res
                .status(500)
                .json(error.message);

        };

    };

    @ApiDeleteOneVehicleByIdDoc()
    @Delete("/:id")
    public async deleteOneById(
        @Req() req: Request,
        @Param("id") id: string,
        @Res() res: Response,
    ) {

        const vehicleId = id;

        try {

            const deleteOneByIdResponse = await this.deleteOneVehicleByIdUseCase.execute(vehicleId);

            res
                .status(200)
                .json(
                    {
                        message: 'vehicle deleted successfully',
                        payload: deleteOneByIdResponse,
                    }
                );

        } catch (error) {

            res
                .status(500)
                .json(error.message);

        };

    };

    @ApiCreateVehicleDoc()
    @Post()
    @UseInterceptors(
        FilesInterceptor('files'),
        VehicleFormDataInterceptor
    )
    public async create(
        @Req() req: Request,
        @Body() body: CreateVehicleRequestBody,
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Res() res: Response,
    ) {

        const ownerId = req.user.id;

        const {
            modelId,
            deleteIds,
            ...bodyRes
        } = body;

        try {

            const pictures = files.map(file => {

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

            const createVehicleRes = await this.createVehicleUseCase.execute(
                {
                    ownerId,
                    modelId,
                    files: pictures,
                    vehicle: bodyRes,
                }
            );

            return res
                .status(201)
                .json(
                    {
                        message: 'vehicle saved successfully',
                        payload: createVehicleRes,
                    }
                );

        } catch (error) {

            return res
                .status(500)
                .json(error.message);

        };

    };

};