import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfConversionService } from 'src/service/pdf-conversion.service';
import * as path from 'path';
import * as fs from 'fs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('pdf')
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfConversionService: PdfConversionService) {}

  @Post('convert-multi')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Convertir pdf a imagen' })
  async convertPdfToSingleImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    if (!file || file.mimetype !== 'application/pdf') {
      throw new BadRequestException('El archivo debe ser un PDF.');
    }

    // Guarda el PDF temporalmente
    const tempDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFilePath = path.join(tempDir, file.originalname);
    fs.writeFileSync(tempFilePath, file.buffer);

    try {
      // Convierte el PDF a una única imagen (solo la primera página)
      const firstPageImagePath =
        await this.pdfConversionService.convertPdfToSingleImage(tempFilePath);

      // Verifica si el archivo temporal existe antes de eliminarlo
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath); // Eliminar el PDF temporal después de la conversión
      }

      // Convierte la ruta relativa a absoluta para res.sendFile
      const absoluteImagePath = path.resolve(firstPageImagePath);

      // Envia la imagen como respuesta
      return res.sendFile(absoluteImagePath, {
        headers: { 'Content-Type': 'image/png' },
      });
    } catch (error) {
      // Elimina el archivo temporal en caso de error
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      throw error;
    }
  }
}
