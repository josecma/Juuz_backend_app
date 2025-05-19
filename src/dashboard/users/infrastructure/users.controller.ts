import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { findOneSwagger } from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { UsersService } from '../application/users.service';
import { UserStatsDto } from '../domain/userStats.dto';

const controllerName = 'Dashboard Company';

@ApiTags('dashboard/user')
@Controller({
  path: 'dashboard/user',
  version: '1',
})
export class UsersController {
  constructor(private readonly service: UsersService) {}

  /**
   * Gets a company by id.
   * @param id ID of the company to retrieve.
   * @returns Company that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(UserStatsDto, controllerName))
  @Get('/top-cities-and-total')
  async findUsers(): Promise<UserStatsDto> {
    return this.service.getUserStats();
  }
}
