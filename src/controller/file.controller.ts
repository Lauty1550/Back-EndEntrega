import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  UseInterceptors,
  UploadedFile,
  Delete,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { multerConfig } from 'src/config.file';
import { CreateFileSchemaDto } from 'src/dto/create.fileSchema.dto';
import { FileSchemaService } from 'src/service/fileSchema.service';
import { GridFsService } from 'src/service/gridfs.service';
import { ValidationService } from 'src/service/validation.service';
import { PdfConversionService } from 'src/service/pdf-conversion.service';

@ApiTags('Archivo')
@Controller('Archivo')
export class FileController {
  constructor(
    private readonly gridFsService: GridFsService,
    private validationService: ValidationService,
    private fileSchemaService: FileSchemaService,
    private pdfConversionService: PdfConversionService,
  ) {}

  @Post('upload')
  @ApiOperation({ summary: 'Subir archivo' })
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new Error('Archivo no enviado');
      }

      // Subir archivo a GridFS
      const newFile = await this.gridFsService.uploadFile(file);

      // Guardar referencia en la colección files
      const createFileDto: CreateFileSchemaDto = {
        fileId: newFile,
        fileName: file.originalname,
        createdAt: new Date(),
      };
      this.fileSchemaService.create(createFileDto);

      return {
        success: true,
        message: 'Archivo subido correctamente',
        fileId: newFile,
      };
    } catch (error) {
      console.error('Error al subir el archivo: ', error);
      throw new BadRequestException('Error al subir el archivo', error.message);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener archivo' })
  async downloadFile(@Param('id') id: string, @Res() res) {
    await this.gridFsService.downloadFile(id, res);
  }

  @Delete('/Borrar/:id')
  @ApiOperation({ summary: 'Borrar archivo' })
  async deleteFile(@Param('id') id: string) {
    try {
      this.validationService.validateObjectId(id);
      await this.gridFsService.deleteFile(id);
      return { status: HttpStatus.OK, messege: 'Archivo eliminado' };
    } catch (error) {
      console.error('Error al eliminar archivo ', error);
      throw new BadRequestException('Error al eliminar archivo', error.message);
    }
  }
}
