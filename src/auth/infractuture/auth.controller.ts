import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { Public } from '../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../domain/login.dtos';
import { LoginResponseDto } from '../domain/loginResponse.dtos';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import {
  findOneSwagger,
  findSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { OtpDto } from '../domain/otp.dtos';
import { OtpResponseDto } from '../domain/otpResponse.dtos';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { CompaniesInfoDto } from '../domain/companiesInfo.dtos';
import { UserInformationDto } from '../domain/userInformation.dtos';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from 'src/_shared/domain/interface/payload.interface';
import { LoginAdminDto } from '../domain/loginAdmin.dto';
import { $Enums } from '@prisma/client';
@ApiTags('Authentication')
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify')
  @ApiResponseSwagger(findOneSwagger(LoginResponseDto, 'Verify'))
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(
      signInDto.email,
      signInDto.phone,
      signInDto.otpNumber
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('otp')
  @ApiResponseSwagger(findOneSwagger(OtpResponseDto, 'OTP'))
  create(@Body() signInDto: OtpDto) {
    return this.authService.simpleSignUp(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('otp/shipper')
  @ApiResponseSwagger(findOneSwagger(OtpResponseDto, 'Shipper OTP'))
  createRider(@Body() signInDto: OtpDto) {
    return this.authService.signUp(
      signInDto,
      $Enums.RolesEnum.SHIPPER,
      $Enums.CompanyType.COMPANY
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('otp/carrier')
  @ApiResponseSwagger(findOneSwagger(OtpResponseDto, 'Carrier OTP'))
  createDriver(@Body() signInDto: OtpDto) {
    return this.authService.signUp(
      signInDto,
      $Enums.RolesEnum.COMPANY,
      $Enums.CompanyType.COMPANY
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(UserInformationDto, 'profile'))
  @Get('profile')
  getProfile(@Request() req: RequestUserId) {
    return this.authService.userInfo(req.user.id, req.user.companyId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(CompaniesInfoDto, 'User companies'))
  @Get('switch')
  switch(@Request() req: RequestUserId) {
    return this.authService.switch(
      req.user.id,
      req.user.logType,
      req.user.companyId
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(CompaniesInfoDto, 'User companies'))
  @Get('switch-company/:id')
  switchCompany(@Request() req: RequestUserId, @Param('id') id: string) {
    return this.authService.switchCompany(req.user.id, +id);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh-token')
  async refresh(@Request() req: RequestUserId) {
    const payload: Payload = {
      id: req.user.id,
      companyId: req.user.companyId,
      sessionId: undefined,
      pointId: req.user.pointId,
      logType: req.user.logType,
      hash: undefined,
    };
    return this.authService.createToken(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')
  async register(@Body() body: LoginAdminDto) {
    const { userUrl, password } = body;
    return this.authService.validateUser(userUrl, password);
  }
}
