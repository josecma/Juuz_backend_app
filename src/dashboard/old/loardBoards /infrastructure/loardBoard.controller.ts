// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Query,
//   HttpCode,
//   HttpStatus,
//   Delete,
// } from '@nestjs/common';
// import { LoaderBoardService } from '../application/loardBoards.service';
// import { ApiTags } from '@nestjs/swagger';
// import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
// import {
//   createSwagger,
//   deleteSwagger,
//   findSwagger,
// } from 'src/_shared/infrastructure/swagger/http.swagger';
// import { ResponseLeaderBoardDto } from '../domain/responseLoardBoard.dtos';
// import { LeaderBoardDto } from '../domain/loardBoard.dtos';

// const controllerName = 'LoaderBoards';

// @ApiTags('LoaderBoards')
// @Controller({
//   path: 'loaderBoards/',
//   version: '1',
// })
// export class LeaderBoardController {
//   constructor(private readonly leaderboardService: LoaderBoardService) {}

//   /**
//    * Creates a Information.
//    * @param body DTO of the creation of a Information.
//    * @returns The created Information or an error.
//    */

//   @HttpCode(HttpStatus.CREATED)
//   @ApiResponseSwagger(createSwagger(null, controllerName))
//   @Post()
//   async addOrUpdateEntry(@Body() entry: LeaderBoardDto) {
//     await this.leaderboardService.addOrUpdateEntry(entry);
//   }

//   /**
//    * Gets all roles. It allows to filter by any field contained in the DTO object of the role.
//    * @param id ID of the role to update.
//    * @returns roles that match a given filter or an error.
//    */

//   @HttpCode(HttpStatus.OK)
//   @ApiResponseSwagger(findSwagger(ResponseLeaderBoardDto, controllerName))
//   @Get()
//   async findAll(
//     @Query('prefix') prefix: string
//   ): Promise<ResponseLeaderBoardDto[]> {
//     return this.leaderboardService.getEntriesStartingWith(prefix);
//   }

//   /**
//    * Deletes a role by id.
//    * @param id ID of the role to delete.
//    * @returns Null or an error.
//    */

//   @HttpCode(HttpStatus.ACCEPTED)
//   @ApiResponseSwagger(deleteSwagger(null, controllerName))
//   @Delete()
//   async clearLeaderboard() {
//     await this.leaderboardService.clearLeaderboard();
//   }
// }
