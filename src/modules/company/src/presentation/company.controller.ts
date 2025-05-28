import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import Request from "src/modules/shared/src/types/types";
import CreateCompanyRequestBody from "./dtos/bodies/create.company.request.body";

@ApiBearerAuth()
@Controller(
    {
        path: "/companies"
    }
)
export default class CompanyController {

    @Post()
    public async create(
        @Req() req: Request,
        @Body() body: CreateCompanyRequestBody,
        @Res() res: Response
    ) {

        try {

        } catch (error) {

            return error;

        };

    };

};