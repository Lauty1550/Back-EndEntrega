import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config.file';
import { GridFsService } from 'src/service/gridfs.service';

@Controller('files')
export class FileController {
  constructor(private readonly gridFsService: GridFsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Archivo no enviado');
    }
    const fileId = await this.gridFsService.uploadFile(file);
    return { fileId };
  }

  @Get(':id')
  async downloadFile(@Param('id') id: string, @Res() res) {
    await this.gridFsService.downloadFile(id, res);
  }
}
