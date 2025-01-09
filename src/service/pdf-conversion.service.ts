import { Injectable, BadRequestException } from '@nestjs/common';
import { fromPath } from 'pdf2pic';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfConversionService {
  async convertPdfToSingleImage(pdfFilePath: string): Promise<string> {
    try {
      const outputDir = path.join(__dirname, '../../uploads/images');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const options = {
        quality: 100,
        format: 'png',
        density: 300, // Resolución
        savePath: outputDir,
        saveFilename: 'first-page',
        width: 2560,
        height: 1440,
        preserveAspectRatio: true, // Mantener la relación de aspecto original
      };

      const convert = fromPath(pdfFilePath, options);

      // Convertir solo la primera página a imagen
      const result = await convert(1, { responseType: 'image' });

      if (!result || !result.path) {
        throw new Error('No se pudo convertir la primera página del PDF.');
      }

      // Verificar si el archivo de la imagen existe
      const imagePath = result.path;
      if (!fs.existsSync(imagePath)) {
        throw new Error('La imagen generada no existe.');
      }

      // Devolver la ruta de la imagen generada
      return imagePath;
    } catch (error) {
      throw new BadRequestException(
        `Error al convertir PDF a imagen: ${error.message}`,
      );
    }
  }
}
