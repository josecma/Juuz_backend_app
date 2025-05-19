import { Module } from '@nestjs/common';
import { WebCrawlerService } from './aplication/webCrawler.service';

@Module({
  providers: [WebCrawlerService],
  exports: [WebCrawlerService],
})
export class WebCrawlerModule {}
