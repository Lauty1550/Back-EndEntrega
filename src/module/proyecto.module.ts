import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProyectoController } from 'src/controller/proyecto.controller';
import { ProyectoService } from 'src/service/proyecto.service';
import { Proyecto, ProyectoSchema } from 'src/schema/proyecto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Proyecto.name, schema: ProyectoSchema },
    ]),
  ],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [ProyectoService, MongooseModule],
})
export class ProyectoModule {}
