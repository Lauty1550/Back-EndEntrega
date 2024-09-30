import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanoController } from 'src/controller/plano.controller';
import { PlanoService } from 'src/service/plano.service';
import { Plano, PlanoSchema } from 'src/schema/plano.schema';
import { ProyectoModule } from './proyecto.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plano.name, schema: PlanoSchema }]),
    ProyectoModule,
  ],
  controllers: [PlanoController],
  providers: [PlanoService],
})
export class PlanoModule {}
