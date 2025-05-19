import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PositiveNumberStringPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    // Validar que el valor sea un número positivo
    const idNumber = Number(value);
    if (isNaN(idNumber) || idNumber <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo.');
    }
    // Devolver el valor original como string
    return value;
  }
}
