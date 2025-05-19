import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidationService } from '../application/validation.service';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { findOneSwagger } from 'src/_shared/infrastructure/swagger/http.swagger';
import { VehicleResponseDTO } from '../domain/vinValdation.dtos';

@ApiTags('Validation')
@Controller({
  path: 'validation/',
  version: '1',
})
export class ValidationController {
  constructor(private validationService: ValidationService) {}

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(VehicleResponseDTO, 'Vin Validation'))
  @Get('/vin-validation/:vinNumber')
  validation(
    @Param('vinNumber') vinNumber: string
  ): Promise<VehicleResponseDTO> {
    return this.validationService.vinValidations(vinNumber);
  }
}
