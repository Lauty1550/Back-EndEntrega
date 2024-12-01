import { Module } from '@nestjs/common';
import { FileController } from 'src/controller/file.controller';
import { GridFsService } from 'src/service/gridfs.service';
import { PlanoModule } from './plano.module';
import { ValidationModule } from './validation.module';

@Module({
  imports: [PlanoModule, ValidationModule],
  controllers: [FileController],
  providers: [GridFsService],
})
export class FileModule {}
