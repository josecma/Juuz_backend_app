import { Injectable } from '@nestjs/common';
import { AblyService } from './_shared/providers/ably/application/ably.service';
import { WebCrawlerService } from './_shared/providers/webCrawler/aplication/webCrawler.service';
import { DownloadService } from './_shared/providers/download/aplication/download.service';
import { SendmailService } from './_shared/application/sendEmail.service';
import { UsersService } from './appCore/users/application/users.service';

@Injectable()
export class AppService {
  constructor(
    private readonly ablyService: AblyService,
    private readonly webCrawlerService: WebCrawlerService,
    private readonly downloadService: DownloadService,
    private readonly sendmailService: SendmailService,
    private readonly userService: UsersService
  ) {}
  async getHello() {
    const sd = {
      to: 'recipient@example.com',
      subject: 'Test Email',
      templateName: 'test',
      context: {
        name: 'Recipient',
      },
    };
    await this.sendmailService.sendTemplateEmail(
      sd.to,
      sd.to,
      sd.subject,
      sd.templateName,
      sd.to
    );
    // const user = await this.ablyService.generateTokenForUser('12', '2323');
    // const channel = await this.ablyService.createChannel('2323');
    // const public1 = await this.ablyService.publishMessage(
    //   '2323',
    //   '2323',
    //   '2323',
    // );

    // const results = await DecodeVinValues('1A1A4AFY2J2008189');

    // return results;
    // const link = await this.webCrawlerService.findDownloadLink(
    //   'https://vpic.nhtsa.dot.gov/api/',
    // );
    // await this.downloadService.downloadFile(
    //   'https://vpic.nhtsa.dot.gov' + link,
    //   'file.zip',
    // );
  }

  async tokens(userId: string) {
    const user: any = await this.userService.findOne({
      ...this.userService.filter(userId),
      select: { ablyChannel: true },
    });
    // return {
    //   tokens: await this.ablyService.generateTokenForUser(
    //     user.ablyChannel.ablyUserId,
    //     user.ablyChannel.name,
    //   ),
    //   channel: user.ablyChannel.name,
    // };
  }

  async sendText(userId: string) {
    // const user: any = await this.userService.findOne({
    //   ...this.userService.filter(userId),
    //   select: { ablyChannel: true },
    // });
    // console.log(user);
    // // const channel = await this.ablyService.createChannel(user.ablyChannel);
    // const asd = await this.ablyService.publishMessage(
    //   user.ablyChannel.name,
    //   '2323',
    //   '2323',
    // );
    // console.log(asd);
  }
}
