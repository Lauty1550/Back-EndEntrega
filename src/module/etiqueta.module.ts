import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EtiquetaController } from 'src/controller/etiqueta.controller';
import { Etiqueta, EtiquetaSchema } from 'src/schema/etiqueta.schema';
import { EtiquetaService } from 'src/service/etiqueta.service';
import { ValidationModule } from './validation.module';
import { PlanoModule } from './plano.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Etiqueta.name, schema: EtiquetaSchema },
    ]),
    ValidationModule,
    forwardRef(() => PlanoModule),
  ],
  controllers: [EtiquetaController],
  providers: [EtiquetaService],
  exports: [EtiquetaService],
})
export class EtiquetaModule {}
