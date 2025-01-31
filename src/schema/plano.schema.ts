import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Etiqueta } from './etiqueta.schema';

export type PlanoDocument = HydratedDocument<Plano>;

@Schema()
export class Plano {
  @Prop({ required: true })
  especialidad: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etiqueta' }] })
  etiquetas: Etiqueta[];

  @Prop({ required: true })
  archivoUrl: string;

  @Prop({ required: true })
  proyectoId: string;

  @Prop({ required: true })
  tipoArchivo: string;

  _id: string;
}
export const PlanoSchema = SchemaFactory.createForClass(Plano);
