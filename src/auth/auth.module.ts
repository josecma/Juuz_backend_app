import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MailerService } from 'src/_shared/application/nodeMailer.service';
import { OtpSpeakeasyService } from 'src/_shared/application/otpSpeakeasy.service';
import { PasswordService } from 'src/_shared/application/password.service';
import { AblyService } from 'src/_shared/providers/ably/application/ably.service';
import { StripeModule } from 'src/_shared/providers/stripe/stripe.module';
import { TwilioModule } from 'src/_shared/providers/twilio/twilio.module';
import { CompaniesModule } from 'src/appCore/companies/companies.module';
import { PaymentMethodsModule } from 'src/appCore/paymentMethods/paymentMethods.module';
import { PermissionsModule } from 'src/appCore/permissions/permissions.module';
import { RolesService } from 'src/appCore/roles/application/roles.service';
import { SessionsModule } from 'src/appCore/sessions/sessions.module';
import { UserCompanyRolesModule } from 'src/appCore/userCompanyRoles/userCompanyRoles.module';
import { UsersModule } from 'src/appCore/users/users.module';
import { S3PhotoService } from 'src/s3/aplication/s3Photo.service';
import { SESService } from 'src/s3/aplication/ses.service';
import { AWSModule } from 'src/s3/aws.module';
import { AuthGuard } from './application/auth.guard';
import { AuthService } from './application/auth.service';
import { AuthController } from './infractuture/auth.controller';

@Module({
  imports: [
    UsersModule,
    SessionsModule,
    TwilioModule,
    forwardRef(() => CompaniesModule),
    PermissionsModule,
    UserCompanyRolesModule,
    StripeModule,
    PaymentMethodsModule,
    AWSModule,
  ],
  providers: [
    AblyService,
    AuthService,
    RolesService,
    SESService,
    MailerService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    PasswordService,
    OtpSpeakeasyService,
    S3PhotoService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
