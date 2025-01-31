import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyectista, ProyectistaSchema } from 'src/schema/proyectista.schema';
import { ProyectoSchema } from 'src/schema/proyecto.schema';
import { ValidationModule } from './validation.module';
import { ProyectoModule } from './proyecto.module';
import { ProyectistaController } from 'src/controller/proyectista.controller';
import { ProyectistaService } from 'src/service/proyectista.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Proyectista.name, schema: ProyectistaSchema },
    ]),
    forwardRef(() => ProyectoModule),
    ValidationModule,
  ],
  controllers: [ProyectistaController],
  providers: [ProyectistaService],
  exports: [ProyectistaService],
})
export class ProyectistaModule {}
