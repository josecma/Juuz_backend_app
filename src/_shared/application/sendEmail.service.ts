import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

@Injectable()
export class SendmailService {
  private sesClient: SESClient;

  constructor() {
    this.sesClient = new SESClient({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      region: process.env.AWS_REGION,
    });
  }

  private compileTemplate(templateName: string, context: any): string {
    const filePath = path.join(__dirname, '../templates', `${templateName}.hbs`);
    const source = fs.readFileSync(filePath, 'utf8');
    const template = Handlebars.compile(source);
    return template(context);
  }

  createSendEmailCommand(
    toAddress: string,
    fromAddress: string,
    subject: string,
    htmlBody: string,
    textBody: string,
  ) {
    return new SendEmailCommand({
      Destination: {
        ToAddresses: [toAddress],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlBody,
          },
          Text: {
            Charset: 'UTF-8',
            Data: textBody,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: fromAddress,
    });
  }

  async sendTemplateEmail(
    to: string,
    from: string,
    subject: string,
    templateName: string,
    context: any,
  ) {
    const htmlBody = this.compileTemplate(templateName, context);
    const textBody = 'Fallback text content';

    const sendEmailCommand = this.createSendEmailCommand(
      to,
      from,
      subject,
      htmlBody,
      textBody,
    );
    try {
      return await this.sesClient.send(sendEmailCommand);
    } catch (e) {
      console.error('Failed to send email.', e);
      return e;
    }
  }
}
