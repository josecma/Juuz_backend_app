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
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MassagesService } from '../application/messages.service';
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { UpdateMessageDto, MessageDto } from '../domain/message.dtos';
import { PaginationMessageDto } from '../domain/pagination-message.dto';
import { MessageEntity } from '../domain/message.entity';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'Subcservices';
@ApiTags('Subcservices')
@Controller({
  path: 'messages/',
  version: '1',
})
export class SubcservicesController {
  constructor(private readonly service: MassagesService) {}

  /**
   * Creates a message.
   * @param body DTO of the creation of a message.
   * @returns The created message or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(MessageEntity, controllerName))
  @Post()
  async createMessage(
    @Body() body: MessageDto,
    @Request() req: RequestUserId
  ): Promise<MessageEntity> {
    const { ...data } = body;

    return await this.service.create({
      data: {
        ...data,
        ownerId: req.user.id,
        companyId: req.user.companyId,
      },
    });
  }

  /**
   * Gets all messages. It allows to filter by any field contained in the DTO object of the message.
   * @param page Number of the page to retrieve.
   * @param limit Limit of messages to retrieve.
   * @param filter Filter of the messages to be retrieved in stringified JSON format.
   * @returns messages that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(MessageEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationMessageDto,
    @Request() req: RequestUserId
  ): Promise<PaginatedResponse<MessageEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
      where: {
        ownerId: req.user.id,
        companyId: req.user.companyId,
      },
    });
  }

  /**
   * Gets all messages. It allows to filter by any field contained in the DTO object of the message.
   * @param page Number of the page to retrieve.
   * @param limit Limit of messages to retrieve.
   * @param filter Filter of the messages to be retrieved in stringified JSON format.
   * @returns messages that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(MessageEntity, controllerName))
  @Get('unread/')
  async readFindAll(
    @Query() pagination: PaginationMessageDto,
    @Request() req: RequestUserId
  ): Promise<PaginatedResponse<MessageEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
      where: {
        ownerId: req.user.id,
        companyId: req.user.companyId,
        unread: true,
      },
      select: this.service.messagesSelect,
    });
  }

  /**
   * Gets a message by id.
   * @param id ID of the message to retrieve.
   * @returns Message that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(MessageEntity, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MessageEntity> {
    return this.service.findOne({
      ...this.service.filter(id),
      select: this.service.messagesSelect,
    });
  }

  /**
   * Updates a message. It allows to update any field contained in the DTO object of the message.
   * @param id ID of the message to update.
   * @param UpdateMessageDto Object containing the fields to update.
   * @returns The updated message or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(MessageEntity, controllerName))
  @Patch('unread/:id')
  async readessage(
    @Param('id') id: string,
    @Request() req: RequestUserId
  ): Promise<MessageEntity> {
    return this.service.update(this.service.filter(id), {
      data: { unread: false },
      where: {
        id: +id,
        ownerId: req.user.id,
        companyId: req.user.companyId,
        unread: true,
      },
      select: this.service.messagesSelect,
    });
  }

  /**
   * Updates a message. It allows to update any field contained in the DTO object of the message.
   * @param id ID of the message to update.
   * @param UpdateMessageDto Object containing the fields to update.
   * @returns The updated message or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(MessageEntity, controllerName))
  @Patch(':id')
  async updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto
  ): Promise<MessageEntity> {
    return this.service.update(this.service.filter(id), {
      data: updateMessageDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a message by id.
   * @param id ID of the message to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(MessageEntity, controllerName))
  @Delete(':id')
  async deleteMessage(@Param('id') id: string): Promise<MessageEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id)
    );
  }
}
