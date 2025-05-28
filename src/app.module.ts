import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { SendmailService } from './_shared/application/sendEmail.service';
import { RefreshTokenStrategy } from './_shared/infrastructure/strategies/refreshToken.strategies';
import { AblyModule } from './_shared/providers/ably/ably.module';
import { DownloadModule } from './_shared/providers/download/download.module';
import { HealthModule } from './_shared/providers/healthCheck/healthCheck.module';
import { InitializerModule } from './_shared/providers/initializer/initializer.module';
import { StripeModule } from './_shared/providers/stripe/stripe.module';
import { ValidationModule } from './_shared/providers/validation/validation.module';
import { WebCrawlerModule } from './_shared/providers/webCrawler/webCrawler.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandsModule } from './appCore/brand/brands.module';
import { CompaniesModule } from './appCore/companies/companies.module';
import { ComunicationsModule } from './appCore/comunications/comunications.module';
import { DriversModule } from './appCore/drivers/drivers.module';
import { InformationsModule } from './appCore/informations/informations.module';
import { MessagesModule } from './appCore/messages/messages.module';
import { NegotiationsModule } from './appCore/negotiations/negotiations.module';
import { OrdersModule } from './appCore/orders/orders.module';
// import { PaymentsModule } from './appCore/payments/payments.module';
import { PointsModule } from './appCore/points/points.module';
import { RolesModule } from './appCore/roles/roles.module';
import { ServicesModule } from './appCore/services/services.module';
import { SubServicesModule } from './appCore/subServices/subServices.module';
import { UserCompanyRolesModule } from './appCore/userCompanyRoles/userCompanyRoles.module';
import { VehicleInfosModule } from './appCore/vehicleInfos/vehicleInfos.module';
// import { RolesGuard } from './auth/application/roles.guard';
// import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { DashboardModule } from './dashboard/dashboard.module';
import AuthModule from './modules/auth/auth.module';
import { AuthzGuard } from './modules/auth/src/presentation/guards/authz.guard';
import CompanyModule from './modules/company/company.module';
import EvidenceModule from './modules/evidence/evidence.module';
import NegotiationModule from './modules/negotiation/negotiation.module';
import OrderModule from './modules/order/order.module';
import PerformanceModule from './modules/performance/performance.module';
import PointModule from './modules/point/point.module';
import SharedModule from './modules/shared/shared.module';
import UserModule from './modules/user/user.module';
import VehicleModule from './modules/vehicle/vehicle.module';
import { AWSModule } from './s3/aws.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRESIN || '48h',
      },
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          // configure your prisma middleware
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.BULLMQ_HOST,
        port: +process.env.BULLMQ_PORT,
        password: process.env.BULLMQ_SECRET,
      },
    }),
    ThrottlerModule.forRoot({
      errorMessage: 'Too many requests, please try again later.',
      throttlers: [
        {
          limit: 100,
          ttl: 60000,
        },
      ],
    }),
    ScheduleModule.forRoot(),
    AblyModule,
    //UsersModule,
    // AuthModule,
    InformationsModule,
    PointsModule,
    OrdersModule,
    DriversModule,
    VehicleInfosModule,
    ServicesModule,
    SubServicesModule,
    InitializerModule,
    ComunicationsModule,
    HealthModule,
    RolesModule,
    HealthModule,
    CompaniesModule,
    WebCrawlerModule,
    DownloadModule,
    ValidationModule,
    // PaymentsModule,
    BrandsModule,
    NegotiationsModule,
    StripeModule,
    UserCompanyRolesModule,
    MessagesModule,
    DashboardModule,
    AWSModule,
    SharedModule,
    PointModule,
    UserModule,
    OrderModule,
    VehicleModule,
    CompanyModule,
    EvidenceModule,
    PerformanceModule,
    NegotiationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    SendmailService,
    RefreshTokenStrategy,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthzGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: CustomThrottleGuard,
    // },
  ],
})
export class AppModule { }
