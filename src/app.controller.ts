import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // @Public()
  // getHello() {
  //   return this.appService.getHello();
  // }

  // @Get("/ably")
  // we(@Request() req: RequestUserId) {
  //   return this.appService.sendText(req.user.id+"");
  // }

  // @Get("/ablyUserId")
  // async w1(@Request() req: RequestUserId) {
  //   return await this.appService.tokens(req.user.id+"");
  // }
}
