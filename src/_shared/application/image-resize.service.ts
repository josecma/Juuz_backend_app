import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageResizeService {
  async resizeAndOptimize(
    buffer: Buffer,
    options: {
      widths: number[]; // Anchos deseados
      formats: { format: keyof sharp.FormatEnum; quality: number }[]; // Formatos y calidades deseadas
      fit?: keyof sharp.FitEnum;
      withoutEnlargement?: boolean;
    }
  ): Promise<{ [key: string]: Buffer }> {
    const {
      widths,
      formats,
      fit = 'inside',
      withoutEnlargement = true,
    } = options;

    try {
      const results: { [key: string]: Buffer } = {};

      for (const width of widths) {
        for (const { format, quality } of formats) {
          const key = `${format}_${width}`;
          const transformedImage = await sharp(buffer)
            .resize({
              width,
              fit,
              withoutEnlargement,
            })
            .toFormat(format, { quality })
            .toBuffer();

          results[key] = transformedImage;
        }
      }

      return results;
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      throw error;
    }
  }
}