import { Controller } from "@nestjs/common";

@Controller(
    {
        path: 'orders'
    }
)
export default class OrderController {

    public constructor() { };

    // @Get('/location_evidence')
    // public async getLocationEvidence(
    //     @Request() req: RequestUserId,
    //     @Body() body: GetLocationEvidenceDto,
    // ) {
    //     try {



    //     } catch (error) {

    //         console.error(error);
    //         throw error;

    //     };

    // };

    // @Post('/location_evidence/create')
    // @UseInterceptors(FilesInterceptor('files'), FormDataInterceptor)
    // public async createLocationEvidence(
    //     @Request() req: RequestUserId,
    //     @Body() body: CreateLocationEvidenceDto,
    //     @UploadedFiles() files: Array<Express.Multer.File>,
    // ) {

    //     const { orderId, coords } = body;

    //     try {

    //         const fileArr = files.map(file => {

    //             if (!Buffer.isBuffer(file.buffer)) {
    //                 throw new Error(`the file ${file.originalname}, does not a valid buffer`);
    //             };

    //             const extName = extname(file.originalname);

    //             const newName = file.originalname.replace(extName, `-${Date.now()}`);

    //             const key = `${newName}${extName}`;

    //             return {
    //                 key: key,
    //                 buffer: file.buffer,
    //                 contentType: file.mimetype,
    //                 size: file.size
    //             };

    //         });

    //         await this.createLocationEvidenceService.execute({
    //             userId: req.user.id,
    //             orderId: orderId,
    //             coords: coords,
    //             files: fileArr,
    //         });

    //         return { msg: 'location evidence created successfully' };

    //     } catch (error) {

    //         console.error(error);
    //         throw error;

    //     };

    // };

};