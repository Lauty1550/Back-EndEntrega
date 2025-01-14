import { Module } from '@nestjs/common';
import { FileController } from 'src/controller/file.controller';
import { GridFsService } from 'src/service/gridfs.service';
import { PlanoModule } from './plano.module';
import { ValidationModule } from './validation.module';
import { FileSchemaModule } from './file.schema.module';
import { PdfConversionService } from 'src/service/pdf-conversion.service';

@Module({
  imports: [PlanoModule, FileSchemaModule, ValidationModule],
  controllers: [FileController],
  providers: [GridFsService, PdfConversionService],
})
export class FileModule {}
