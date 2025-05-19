import { Injectable } from '@nestjs/common';
const path = require('path');
import * as nodemailer from "nodemailer";
const fs = require('fs').promises;

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_USE_TLS,
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
      },
    } as nodemailer.TransportOptions);
  }

  async sendOtpEmail(to: string, subject: string, otpCode: string) {
    try {
      const templatePath = path.join(
        __dirname,
        '../../../src/_shared/templates',
        'otpEmailTemplate.ES.html'
      );
      let htmlContent = await fs.readFile(templatePath, 'utf-8');

      // Reemplaza el marcador con el Content-ID del logo
      htmlContent = htmlContent
        .replace('URL_DEL_LOGO', 'cid:companyLogo') // Referencia al Content-ID
        .replace('{{OTP_CODE}}', otpCode)
        .replace('{{YEAR}}', new Date().getFullYear().toString());

      const mailOptions = {
        from: process.env.DEFAULT_FROM_EMAIL,
        to,
        subject,
        html: htmlContent, // Usa el HTML generado
        attachments: [
          {
            filename: 'logo.jpeg', // Nombre del archivo
            path: path.join(
              __dirname,
              '../../../src/_shared/templates/180796079.jpeg'
            ), // Ruta al archivo
            cid: 'companyLogo', // Content-ID que se usará en el HTML
          },
        ],
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      return false;
    }
  }

  public async sendVerificationUrlEmail(
    to: string,
    subject: string,
    verificationUrl: string
  ): Promise<boolean> {
    try {
      // Lee el archivo de la plantilla
      const templatePath = path.join(
        __dirname,
        '../../../src/_shared/templates',
        'verificationEmailTemplate.ES.html'
      );
      let htmlContent = await fs.readFile(templatePath, 'utf-8');

      // Reemplaza las variables dinámicas
      htmlContent = htmlContent
        .replace('cid:companyLogo', 'cid:companyLogo')
        .replace('{{VERIFICATION_URL}}', verificationUrl)
        .replace('{{YEAR}}', new Date().getFullYear().toString());

      // Configura las opciones del correo
      const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.DEFAULT_FROM_EMAIL,
        to,
        subject,
        html: htmlContent,
        attachments: [
          {
            filename: 'logo.jpeg',
            path: path.join(
              __dirname,
              '../../../src/_shared/templates/180796079.jpeg'
            ),
            cid: 'companyLogo',
          },
        ],
      };

      // Envía el correo
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      return false;
    }
  }

  async sendOtpEmailWhitUrl(
    to: string,
    subject: string,
    otpCode: string,
    companyId: number
  ) {
    try {
      // Ruta de la plantilla HTML
      const templatePath = path.join(
        __dirname,
        '../../../src/_shared/templates',
        'otpEmailTemplateWhitUrl.ES.html'
      );

      // Lee el contenido de la plantilla
      let htmlContent = await fs.readFile(templatePath, 'utf-8');

      // Reemplaza los marcadores dinámicos en la plantilla
      const url = `dev.juuz.io/login/verify?email=${to}&otp=${otpCode}&company=${companyId}`;
      htmlContent = htmlContent
        .replace('URL_DEL_LOGO', 'cid:companyLogo') // Referencia al Content-ID del logo
        .replace('{{OTP_CODE}}', otpCode) // Código OTP
        .replace('{{YEAR}}', new Date().getFullYear().toString()) // Año actual
        .replace('{{URL}}', url); // URL dinámica

      // Configura las opciones del correo
      const mailOptions = {
        from: process.env.DEFAULT_FROM_EMAIL, // Dirección del remitente
        to, // Dirección del destinatario
        subject, // Asunto del correo
        html: htmlContent, // Contenido HTML generado
        attachments: [
          {
            filename: 'logo.jpeg', // Nombre del archivo del logo
            path: path.join(
              __dirname,
              '../../../src/_shared/templates/180796079.jpeg'
            ), // Ruta al archivo del logo
            cid: 'companyLogo', // Content-ID para incrustar el logo
          },
        ],
      };

      // Envía el correo usando Nodemailer
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      return false;
    }
  }
}
