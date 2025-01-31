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
      const mergedImagePath =
        await this.pdfConversionService.convertPdfToSingleImage(tempFilePath);

      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath); // Eliminar el PDF temporal después de la conversión
      }

      const absoluteImagePath = path.resolve(mergedImagePath);

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
