// import { Body, Controller, Inject, Post } from "@nestjs/common";
// import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
// import CreateCategoryService from "../../application/create.category.service";
// import CreateCategoryDto from "../dtos/create.category.dto";

// @ApiTags('categories')
// @Controller({
//     path: "categories"
// })
// export default class CategoryController {

//     public constructor(
//         @Inject()
//         private readonly createCategoryService: CreateCategoryService,
//     ) { };

//     @ApiOperation({
//         summary: 'create new category',
//         description: '',
//     })
//     @ApiBody({ type: CreateCategoryDto, description: 'The required body data to create a new category' })
//     @Post('/create')
//     public async send(@Body() createCategoryDto: CreateCategoryDto) {

//         try {

//             await this.createCategoryService.execute(createCategoryDto);

//         } catch (error) {

//             console.error(error);
//             throw new Error(error);

//         };

//     };

// };