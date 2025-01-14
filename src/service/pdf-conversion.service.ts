import { Injectable, BadRequestException } from '@nestjs/common';
import { fromPath } from 'pdf2pic';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';

@Injectable()
export class PdfConversionService {
  async convertPdfToSingleImage(pdfFilePath: string): Promise<string> {
    try {
      const outputDir = path.join(__dirname, '../../uploads/images');

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Carga el PDF para contar las páginas
      const pdfBytes = fs.readFileSync(pdfFilePath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const totalPages = pdfDoc.getPages().length;

      const options = {
        quality: 100,
        format: 'png',
        density: 200, // Resolución
        savePath: outputDir,
        saveFilename: 'page',
        width: 7680,
        height: 4320,
        preserveAspectRatio: true,
      };

      const convert = fromPath(pdfFilePath, options);

      const imagePaths: string[] = [];

      // Convierte todas las páginas del PDF
      for (let i = 1; i <= totalPages; i++) {
        const result = await convert(i, { responseType: 'image' });
        if (!result || !result.path) {
          throw new Error(`No se pudo convertir la página ${i} del PDF.`);
        }
        imagePaths.push(result.path);
        console.log(`Página ${i} convertida: ${result.path}`);
      }

      // Si solo hay una página, procesa solo esa imagen
      let finalImagePath = '';
      if (totalPages === 1) {
        finalImagePath = path.join(outputDir, 'single-page-image.png');
        await this.compressImageWithoutLoss(imagePaths[0], finalImagePath);
      } else {
        // Si hay más de una página, une todas las imágenes
        finalImagePath = path.join(outputDir, 'merged-image.png');
        await this.mergeImages(imagePaths, finalImagePath);
      }

      // Eliminar los archivos temporales después de crear la imagen final
      await this.cleanUpTempFiles(imagePaths);

      return finalImagePath;
    } catch (error) {
      console.error('Error durante la conversión:', error.message);
      throw new BadRequestException(
        `Error al convertir PDF a imagen: ${error.message}`,
      );
    }
  }

  // Método para comprimir la imagen PNG sin pérdida de calidad
  private async compressImageWithoutLoss(
    imagePath: string,
    finalImagePath: string,
  ): Promise<void> {
    try {
      await sharp(imagePath)
        .png({
          compressionLevel: 9,
          quality: 100,
        })
        .toFile(finalImagePath);
    } catch (err) {
      console.error('Error al comprimir la imagen sin pérdida:', err);
      throw new Error(
        'Error al comprimir la imagen sin pérdida: ' + err.message,
      );
    }
  }

  // Método para limpiar los archivos temporales generados durante la conversión
  private async cleanUpTempFiles(imagePaths: string[]): Promise<void> {
    try {
      for (const imagePath of imagePaths) {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Elimina el archivo temporal
        }
      }
    } catch (err) {
      console.error('Error al eliminar archivos temporales:', err);
    }
  }

  // Método para unir las imágenes cuando hay múltiples páginas
  private async mergeImages(
    imagePaths: string[],
    finalImagePath: string,
  ): Promise<void> {
    try {
      for (const imagePath of imagePaths) {
        if (!fs.existsSync(imagePath)) {
          throw new Error(`La imagen ${imagePath} no existe.`);
        }
      }

      // Obtener las dimensiones de las imágenes generadas
      const imageMetadataPromises = imagePaths.map((imagePath) =>
        sharp(imagePath).metadata(),
      );

      const imageMetadata = await Promise.all(imageMetadataPromises);
      const imageBuffers: Buffer[] = [];

      let totalHeight = 0;
      let maxWidth = 0;

      // Procesar cada imagen
      for (let i = 0; i < imagePaths.length; i++) {
        const metadata = imageMetadata[i];
        const imageBuffer = await sharp(imagePaths[i]).toBuffer();
        imageBuffers.push(imageBuffer);
        totalHeight += metadata.height ?? 0;
        maxWidth = Math.max(maxWidth, metadata.width ?? 0); // Encontramos el máximo ancho
      }

      // Une todas las imágenes en una sola
      await sharp({
        create: {
          width: maxWidth,
          height: totalHeight,
          channels: 3,
          background: { r: 255, g: 255, b: 255 },
        },
      })
        .composite(
          imageBuffers.map((buffer, index) => ({
            input: buffer,
            top: index * imageMetadata[index].height!,
            left: 0,
          })),
        )
        .jpeg({ quality: 95 })
        .toFile(finalImagePath); // Guardar la imagen final
    } catch (err) {
      console.error('Error al unir las imágenes:', err);
      throw new Error('Error al unir las imágenes: ' + err.message);
    }
  }
}
