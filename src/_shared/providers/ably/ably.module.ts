import { Module, Global } from '@nestjs/common';
import { AblyService } from './application/ably.service';
import { AblyController } from './infractuture/ably.controller';
import SharedModule from 'src/modules/shared/shared.module';
import UserModule from 'src/modules/user/user.module';

@Global()
@Module({
  imports: [SharedModule, UserModule],
  controllers: [AblyController],
  providers: [
    AblyService

  ],
  exports: [
    AblyService
  ],
})
export class AblyModule { }
