import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { HealthService } from '../application/healthCheck.service';
import { ApiTags } from '@nestjs/swagger';
// import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('HealthCheck')
@Controller({
  path: 'healths/',
  version: '1',
})
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private readonly healthService: HealthService,
    private http: HttpHealthIndicator,
    private db: DiskHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) { }
  // @Public()
  @Get('db')
  @HealthCheck()
  checkDB() {
    return this.healthService.isHealthy(new Date().toDateString());
  }


  @Get('url')
  @HealthCheck()
  checkServer() {
    return this.health.check([
      () => this.http.pingCheck('basic check', process.env.SERVICE_URL),
    ]);
  }

  @Get()
  @HealthCheck()
  checkAll() {
    return this.health.check([
      () => this.http.pingCheck('basic check', process.env.SERVICE_URL),
      () =>
        this.disk.checkStorage('disk health', {
          thresholdPercent: 0.5,
          path: '/',
        }),
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
    ]);
  }
}
