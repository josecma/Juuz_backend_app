import { Module, Global } from '@nestjs/common';
import { ValidationService } from './application/validation.service';
import { ValidationController } from './infractuture/validation.controller';
import { BrandsService } from 'src/appCore/brand/aplication/brand.service';

@Global()
@Module({
  controllers: [ValidationController],
  providers: [ValidationService, BrandsService],
  exports: [ValidationService],
})
export class ValidationModule {}
