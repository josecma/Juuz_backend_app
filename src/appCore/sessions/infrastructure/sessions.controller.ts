import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionsService } from '../application/sessions.service';
import {
    createSwagger,
    deleteSwagger,
    findOneSwagger,
    findSwagger,
    updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { UpdateSessionDto, SessionDto } from '../domain/session.dtos';
import { PaginationSessionDto } from '../domain/pagination-session.dto';
import { SessionEntity } from '../domain/session.entity';
// import { $Enums } from '@prisma/client';
// import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'Sessions';
@ApiTags('Sessions')
@Controller({
    path: 'sessions/',
    version: '1',
})
export class SessionsController {
    constructor(private readonly service: SessionsService) { }

    /**
     * Creates a session.
     * @param body DTO of the creation of a session.
     * @returns The created session or an error.
     */

    @HttpCode(HttpStatus.CREATED)
    @ApiResponseSwagger(createSwagger(SessionDto, controllerName))
    @Post()
    async createSession(@Body() body: SessionDto): Promise<SessionEntity> {
        return await this.service.create({ data: { ...body, hash: '' } });
    }

    /**
     * Gets all sessions. It allows to filter by any field contained in the DTO object of the session.
     * @param page Number of the page to retrieve.
     * @param limit Limit of sessions to retrieve.
     * @param filter Filter of the sessions to be retrieved in stringified JSON format.
     * @returns sessions that match a given filter or an error.
     */

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findSwagger(SessionDto, controllerName))
    @Get()
    async findAll(
        @Query() pagination: PaginationSessionDto,
    ): Promise<PaginatedResponse<SessionEntity>> {
        return this.service.findAll({
            skip: pagination.page,
            take: pagination.perPage,
        });
    }

    /**
     * Gets a session by id.
     * @param id ID of the session to retrieve.
     * @returns Session that matches the given id or an error.
     */

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findOneSwagger(SessionDto, controllerName))
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<SessionEntity> {
        return this.service.findOne(this.service.filter(id));
    }

    /**
     * Updates a session. It allows to update any field contained in the DTO object of the session.
     * @param id ID of the session to update.
     * @param UpdateSessionDto Object containing the fields to update.
     * @returns The updated session or an error.
     */

    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponseSwagger(updateSwagger(SessionDto, controllerName))
    @Patch(':id')
    async updateSession(
        @Param('id') id: string,
        @Body() updateSessionDto: UpdateSessionDto,
    ): Promise<SessionEntity> {
        return this.service.update(this.service.filter(id), {
            data: updateSessionDto,
            where: { id: id },
        });
    }

    /**
     * Deletes a session by id.
     * @param id ID of the session to delete.
     * @returns Null or an error.
     */

    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponseSwagger(deleteSwagger(SessionDto, controllerName))
    @Delete(':id')
    async deleteSession(@Param('id') id: string): Promise<SessionEntity> {
        return this.service.remove(
            this.service.filter(id),
            this.service.filter(id),
        );
    }
}
