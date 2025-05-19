import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
} from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
const path = require('path');
const fs = require('fs').promises;
@Injectable()
export class SESService {
  private sesClient: SESClient;

  constructor() {
    this.sesClient = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  async sendMail(options: {
    to: string;
    subject: string;
    otpCode: string;
  }): Promise<void> {
    const templatePath = path.join(
      __dirname,
      '../../../templates/otpEmailTemplate.ES.html'
    );
    let htmlContent = await fs.readFile(templatePath, 'utf-8');

    htmlContent = htmlContent
      .replace(
        'URL_DEL_LOGO',
        path.join(__dirname, '../../../templates/180796079.jpeg')
      )
      .replace('{{OTP_CODE}}', options.otpCode)
      .replace('{{YEAR}}', new Date().getFullYear().toString());

    const params: SendEmailCommandInput = {
      Source: process.env.AWS_VERIFIED_EMAIL,
      Destination: {
        ToAddresses: [options.to],
      },
      Message: {
        Subject: {
          Data: options.subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: htmlContent,
            Charset: 'UTF-8',
          },
        },
      },
    };

    try {
      const command = new SendEmailCommand(params);
      const response = await this.sesClient.send(command);
      console.log('Correo enviado:', response.MessageId);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  }
}
