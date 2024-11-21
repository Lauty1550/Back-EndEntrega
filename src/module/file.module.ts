import { Module } from '@nestjs/common';
import { FileController } from 'src/controller/file.controller';
import { GridFsService } from 'src/service/gridfs.service';

@Module({
  controllers: [FileController],
  providers: [GridFsService],
})
export class FileModule {}
