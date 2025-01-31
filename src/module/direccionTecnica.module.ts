import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DireccionTecnica,
  DireccionTecnicaSchema,
} from 'src/schema/direccionTecnica.schema';
import { ValidationModule } from './validation.module';
import { ProyectoModule } from './proyecto.module';
import { DireccionTecnicaController } from 'src/controller/direccionTecnica.controller';
import { DireccionTecnicaService } from 'src/service/direccionTecnica.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DireccionTecnica.name, schema: DireccionTecnicaSchema },
    ]),
    forwardRef(() => ProyectoModule),
    ValidationModule,
  ],
  controllers: [DireccionTecnicaController],
  providers: [DireccionTecnicaService],
  exports: [DireccionTecnicaService],
})
export class DireccionTecnicaModule {}
