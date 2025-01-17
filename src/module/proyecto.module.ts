import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProyectoController } from 'src/controller/proyecto.controller';
import { ProyectoService } from 'src/service/proyecto.service';
import { Proyecto, ProyectoSchema } from 'src/schema/proyecto.schema';
import { ValidationModule } from './validation.module';
import { PlanoModule } from './plano.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Proyecto.name, schema: ProyectoSchema },
    ]),
    ValidationModule,
    forwardRef(() => PlanoModule),
  ],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [ProyectoService],
})
export class ProyectoModule {}
