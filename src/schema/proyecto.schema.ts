import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { spec } from 'node:test/reporters';
import { TipoDestino } from 'src/enum/tipo.destino.enum';
import { TipoObra } from 'src/enum/tipo.obra.enum';

export type ProyectoDocument = HydratedDocument<Proyecto>;

@Schema()
export class Proyecto {
  @Prop({ required: false })
  nombreProyecto: string;

  @Prop({ required: false })
  expediente: string;

  @Prop({ required: true, enum: TipoObra })
  obra: TipoObra;

  @Prop({ required: true, enum: TipoDestino })
  destino: TipoDestino;

  @Prop({ required: true })
  ubicacion: string;

  @Prop({ required: true })
  escala: string;

  @Prop({ required: true })
  antecedente: string;

  @Prop({ required: false })
  aprobacion: boolean;

  _id?: string;
}
export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);
