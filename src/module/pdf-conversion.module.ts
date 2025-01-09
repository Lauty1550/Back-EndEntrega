import { Module } from '@nestjs/common';
import { PdfController } from 'src/controller/pdf-conversion.controller';
import { PdfConversionService } from 'src/service/pdf-conversion.service';

@Module({
  controllers: [PdfController],
  providers: [PdfConversionService],
})
export class PdfModule {}
