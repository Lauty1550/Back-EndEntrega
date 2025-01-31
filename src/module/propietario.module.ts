import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Propietario, PropietarioSchema } from 'src/schema/propietario.schema';
import { ValidationModule } from './validation.module';
import { PropietarioController } from 'src/controller/propietario.controller';
import { PropietarioService } from 'src/service/propietario.service';
import { ProyectoModule } from './proyecto.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Propietario.name, schema: PropietarioSchema },
    ]),
    forwardRef(() => ProyectoModule),
    ValidationModule,
  ],
  controllers: [PropietarioController],
  providers: [PropietarioService],
  exports: [PropietarioService],
})
export class PropietarioModule {}
