import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from 'src/schema/file.schema';
import { FileSchemaService } from 'src/service/fileSchema.service';
import { ValidationModule } from './validation.module';
import { FileSchemaController } from 'src/controller/fileSchema.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    ValidationModule,
  ],
  controllers: [FileSchemaController],
  providers: [FileSchemaService],
  exports: [FileSchemaService],
})
export class FileSchemaModule {}
