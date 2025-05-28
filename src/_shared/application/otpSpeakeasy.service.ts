// import { Injectable } from '@nestjs/common';
// import * as speakeasy from 'speakeasy';
// import { OtpResponseDto } from 'src/auth/domain/otpResponse.dtos';
// import { OtpValidateDto } from 'src/auth/domain/otpValidate.dtos';
// import { OtpValidateResponseDto } from 'src/auth/domain/otpValidateResponse.dtos';

// @Injectable()
// export class OtpSpeakeasyService {
//   private secrets = new Map<string, OtpValidateDto>();

//   generateSecret(identifier: string): string {
//     const secret = speakeasy.generateSecret({ length: 20 });
//     this.secrets.set(identifier, {
//       secret: secret.base32,
//       timestamp: Date.now(),
//     });
//     return secret.base32;
//   }

//   generateOtp(identifier: string): OtpResponseDto {
//     const record = this.secrets.get(identifier);
//     if (!record) {
//       throw new Error('No se ha generado un secreto para este identificador.');
//     }

//     const otp = speakeasy.totp({
//       secret: record.secret,
//       encoding: 'base32',
//       digits: 4,
//       step: 600, // Establece el tiempo de paso a 600 segundos (10 minutos)
//     });

//     return { otpNumber: otp }; // OTP de 4 dígitos
//   }

//   validateOtp(identifier: string, token: string): OtpValidateResponseDto {
//     const record = this.secrets.get(identifier);
//     if (!record) {
//       return { valid: false }; // No se encontró el secreto asociado al identificador
//     }

//     // Verifica la expiración del secreto (10 minutos)
//     if (Date.now() - record.timestamp > 10 * 60 * 1000) {
//       this.secrets.delete(identifier); // Opcional: Eliminar el registro si el secreto ha expirado
//       return { valid: false }; // El secreto ha expirado
//     }

//     // Verificación del OTP
//     const valid = speakeasy.totp.verify({
//       secret: record.secret,
//       encoding: 'base32',
//       token: token,
//       digits: 4,
//       step: 600, // Asegura que el tiempo de paso coincida con 600 segundos (10 minutos)
//       window: 0, // Opcional: ajustar ventana si se desea permitir margen de tiempo
//     });

//     if (valid) {
//       this.secrets.delete(identifier); // Opcional: Eliminar el registro después de una verificación exitosa
//     }

//     return { valid: valid };
//   }
// }
