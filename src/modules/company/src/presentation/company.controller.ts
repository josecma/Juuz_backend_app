import { Body, Controller, Get, Param, Patch, Post, Req, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import Request from "src/modules/shared/src/types/types";
import CreateCompanyUseCase from "../application/useCases/create.company.use.case";
import FindCompanyByOwnerIdUseCase from "../application/useCases/find.company.by.owner.use.case";
import FindCompanyVehiclesUseCase from "../application/useCases/find.company.vehicles.use.case";
import FindOneCompanyByIdUseCase from "../application/useCases/find.one.company.by.id.use.case";
import UpdateCompanyUseCase from "../application/useCases/update.company.use.case";
import { ApiCreateCompanyDoc } from "./docs/decorators/api.create.company.doc";
import { ApiGetAllCompanyVehiclesDoc } from "./docs/decorators/api.get.all.company.vehicles.doc";
import { ApiUpdateCompanyDoc } from "./docs/decorators/api.update.company.doc";
import CreateCompanyRequestBody from "./dtos/bodies/create.company.request.body";
import UpdateCompanyRequestBody from "./dtos/bodies/update.company.request.body";
import FindCompanyDriversUseCase from "../application/useCases/find.company.drivers.use.case";

@ApiBearerAuth()
@ApiTags("companies")
@Controller(
    {
        path: "/companies"
    }
)
export default class CompanyController {

    public constructor(
        private readonly createCompanyUseCase: CreateCompanyUseCase,
        private readonly findOneCompanyByIdUseCase: FindOneCompanyByIdUseCase,
        private readonly findCompanyByOwnerIdUseCase: FindCompanyByOwnerIdUseCase,
        private readonly findCompanyVehiclesUseCase: FindCompanyVehiclesUseCase,
        private readonly updateCompanyUseCase: UpdateCompanyUseCase,
        private readonly findCompanyDriversUseCase: FindCompanyDriversUseCase,
    ) { };

    @ApiCreateCompanyDoc()
    @Post()
    public async create(
        @Req() req: Request,
        @Body() body: CreateCompanyRequestBody,
        @Res() res: Response,
    ) {

        try {

            const companyRes = await this.createCompanyUseCase.execute(
                {
                    userId: req.user.id,
                    company: body,
                }
            );

            return res
                .status(201)
                .json(
                    {
                        message: "company created successfully",
                        payload: companyRes,
                    }
                );

        } catch (error) {

            return error;

        };

    };

    @ApiUpdateCompanyDoc()
    @Patch("/:id")
    public async update(
        @Req() req: Request,
        @Param("id") id: string,
        @Body() body: UpdateCompanyRequestBody,
        @Res() res: Response,
    ) {

        try {

            const updateCompanyResponse = await this.updateCompanyUseCase.execute(
                {
                    id,
                    updateObject: body,
                }
            );

            return res
                .status(201)
                .json(
                    {
                        message: "company updated successfully",
                        payload: updateCompanyResponse,
                    }
                );

        } catch (error) {

            return error;

        };

    };

    @Get("/:id")
    public async findOneById(
        @Req() req: Request,
        @Param("id") id: string,
        @Res() res: Response,
    ) {

        try {

            const companyByIdRes = await this.findOneCompanyByIdUseCase.execute(id);

            return res
                .status(200)
                .json(
                    {
                        message: "company found successfully",
                        payload: companyByIdRes,
                    }
                );

        } catch (error) {

            return res
                .status(404)
                .json(error.message);

        };

    };

    @Get("/by/owner")
    public async findOneByOwner(
        @Req() req: Request,
        @Res() res: Response,
    ) {

        const ownerId = req.user.id;

        try {

            const companyByOwnerRes = await this.findCompanyByOwnerIdUseCase.execute(ownerId);

            return res
                .status(200)
                .json(
                    {
                        message: "company found successfully",
                        payload: companyByOwnerRes,
                    }
                );

        } catch (error) {

            return res
                .status(404)
                .json(error.message);

        };

    };

    @ApiGetAllCompanyVehiclesDoc()
    @Get("/:id/vehicles")
    public async findVehicles(
        @Req() req: Request,
        @Param("id") id: string,
        @Res() res: Response,
    ) {

        const companyId = id;

        try {

            const findCompanyVehiclesResponse = await this.findCompanyVehiclesUseCase.execute(companyId);

            return res
                .status(200)
                .json(
                    {
                        message: "vehicles found successfully",
                        payload: findCompanyVehiclesResponse,
                    }
                );

        } catch (error) {

            return res
                .status(404)
                .json(error.message);

        };

    };

    @Get("/:id/drivers")
    public async findDrivers(
        @Req() req: Request,
        @Param("id") id: string,
        @Res() res: Response,
    ) {

        const companyId = id;

        try {

            const findCompanyDriversResponse = await this.findCompanyDriversUseCase.execute(companyId);

            return res
                .status(200)
                .json(
                    {
                        message: "drivers found successfully",
                        payload: findCompanyDriversResponse,
                    }
                );

        } catch (error) {

            return res
                .status(404)
                .json(error.message);

        };

    };

};