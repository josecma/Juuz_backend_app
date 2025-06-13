import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { extname } from "path";
import Request from "src/modules/shared/src/types/types";
import CreateVehicleMakeUseCase from "../../application/useCases/create.vehicle.make.use.case";
import CreateVehicleModelsUseCase from "../../application/useCases/create.vehicle.models.use.case";
import CreateVehicleTypeUseCase from "../../application/useCases/create.vehicle.type.use.case";
import CreateVehicleUseCase from "../../application/useCases/create.vehicle.use.case";
import DeleteOneVehicleByIdUseCase from "../../application/useCases/delete.one.vehicle.by.id.use.case";
import FindAllVehiclesUseCase from "../../application/useCases/find.all.vehicles.use.case";
import FindModelsByMakeIdAndYearUseCase from "../../application/useCases/find.models.by.make.id.and.year.use.case";
import FindVehicleMakesUseCase from "../../application/useCases/find.vehicle.makes.use.case";
import FindVehicleModelsByMakeIdUseCase from "../../application/useCases/find.vehicle.models.by.make.id.use.case";
import FindVehicleTypesUseCase from "../../application/useCases/find.vehicle.types.use.case";
import UpdateVehicleUseCase from "../../application/useCases/update.vehicle.use.case";
import { ApiCreateVehicleDoc } from "../docs/decorators/api.create.vehicle.doc";
import { ApiDeleteOneVehicleByIdDoc } from "../docs/decorators/api.delete.one.vehicle.by.id.doc";
import { ApiFindAllVehiclesDoc } from "../docs/decorators/api.find.all.vehicles.doc";
import CreateMakeModelRequestBody from "../dtos/bodies/create.make.model.request.body";
import CreateVehicleMakeRequestBody from "../dtos/bodies/create.vehicle.make.request.body";
import CreateVehicleRequestBody from "../dtos/bodies/create.vehicle.request.body";
import CreateVehicleTypeRequestBody from "../dtos/bodies/create.vehicle.type.request.body";
import UpdateVehicleRequestBody from "../dtos/bodies/update.vehicle.request.body";
import { default as VehicleFormDataInterceptor } from "../interceptors/vehicle.form.data.interceptor";

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
        private readonly createVehicleTypeUseCase: CreateVehicleTypeUseCase,
        private readonly findVehicleMakesUseCase: FindVehicleMakesUseCase,
        private readonly findVehicleModelsByMakeIdUseCase: FindVehicleModelsByMakeIdUseCase,
        private readonly findModelsByMakeIdAndYearUseCase: FindModelsByMakeIdAndYearUseCase,
        private readonly findVehicleTypesUseCase: FindVehicleTypesUseCase,
        private readonly createVehicleMakeUseCase: CreateVehicleMakeUseCase,
        private readonly createVehicleModelsUseCase: CreateVehicleModelsUseCase,
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

                const uniqueName = `${newName}${extName}`;

                return {
                    fileName: file.filename,
                    uniqueName,
                    originalName: file.originalname,
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

                const uniqueName = `${newName}${extName}`;

                return {
                    fileName: file.filename,
                    uniqueName,
                    originalName: file.originalname,
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

    @Post("/types")
    public async createType(
        @Body() body: CreateVehicleTypeRequestBody,
        @Res() res: Response,
    ) {

        const {
            types
        } = body;

        try {

            const createVehicleTypeResponse = await this.createVehicleTypeUseCase.execute(
                types
            );

            return res
                .status(201)
                .json(
                    {
                        message: 'vehicle type saved successfully',
                        payload: createVehicleTypeResponse,
                    }
                );

        } catch (error) {

            return res
                .status(500)
                .json(error.message);

        };

    };

    @Get("/types")
    public async findTypes(
        @Res() res: Response,
    ) {

        try {

            const findVehicleTypesResponse = await this.findVehicleTypesUseCase.execute();

            return res
                .status(200)
                .json(
                    {
                        message: 'vehicle types obtained successfully',
                        payload: findVehicleTypesResponse,
                    }
                );

        } catch (error) {

            return res
                .status(500)
                .json(error.message);

        };

    };

    @Post("/manufacturers/:name/makes")
    public async createMake(
        @Param("name") name: string,
        @Body() body: CreateVehicleMakeRequestBody,
        @Res() res: Response,
    ) {

        const {
            makes,
        } = body;

        const manufacturer = name;

        try {

            const createVehicleMakeResponse = await this.createVehicleMakeUseCase.execute(
                {
                    makes,
                    manufacturer,
                }
            );

            return res
                .status(201)
                .json(
                    {
                        message: 'vehicle makes saved successfully',
                        payload: createVehicleMakeResponse,
                    }
                );

        } catch (error) {

            return res
                .status(500)
                .json(error.message);

        };

    };

    @Get("/makes")
    public async findAllMakes(
        @Query("name") name: string,
        @Query("year") year: string,
        @Res() res: Response,
    ) {

        try {

            const findVehicleMakesResponse = await this.findVehicleMakesUseCase.execute(
                {
                    name,
                    year: +year,
                }
            );

            return res
                .status(200)
                .json(
                    {
                        message: 'vehicle makes obtained successfully',
                        payload: findVehicleMakesResponse,
                    }
                );

        } catch (error) {

            return res
                .status(500)
                .json(error.message);

        };

    };

    @Get("/makes/:id/models")
    public async findModelsByMakeId(
        @Param("id") id: string,
        @Query("year") year: string,
        @Res() res: Response,
    ) {

        const makeId = id;

        try {

            const findVehicleModelsResponse =
                !year
                    ?
                    await this.findVehicleModelsByMakeIdUseCase.execute(makeId)
                    :
                    await this.findModelsByMakeIdAndYearUseCase.execute(
                        {
                            makeId,
                            year: +year,
                        }
                    );

            return res
                .status(200)
                .json(
                    {
                        message: 'vehicle models obtained successfully',
                        payload: findVehicleModelsResponse,
                    }
                );

        } catch (error) {

            return res
                .status(500)
                .json(error.message);

        };

    };

    @Post("/makes/:id/models")
    public async createModels(
        @Param("id") id: string,
        @Body() body: CreateMakeModelRequestBody,
        @Res() res: Response,
    ) {

        const makeId = id;

        const {
            models
        } = body;

        try {

            const createMakeModelsResponse = await this.createVehicleModelsUseCase.execute(
                {
                    makeId,
                    models
                }
            );

            return res
                .status(201)
                .json(
                    {
                        message: 'make models saved successfully',
                        payload: createMakeModelsResponse,
                    }
                );

        } catch (error) {

            return res
                .status(500)
                .json(error.message);

        };

    };

};