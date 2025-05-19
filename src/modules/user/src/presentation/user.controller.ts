// import { Controller, Inject } from "@nestjs/common";

// @Controller({
//     path: "user"
// })
// export default class UserController {

//     public constructor(
//         @Inject(UserLocationService)
//         private readonly userLocationService: UserLocationService,
//     ) { };

//     // @ApiOperation({
//     //     summary: "get current user location status",
//     //     description: "Endpoint to get the current user location status",
//     // })
//     // @Get("/location_status")
//     // public async getStatusLocation(
//     //     @Request() req: RequestUserId
//     // ) {

//     //     try {

//     //         return await this.userLocationService.execute({ id: req.user.id as unknown as string });

//     //     } catch (error) {

//     //         return { err: `${error.message}` };

//     //     };

//     // };

// };