import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { spec } from 'node:test/reporters';

export type PlanoDocument = HydratedDocument<Plano>;

@Schema()
export class Plano {
  @Prop({ required: true })
  especialidad: string;

  @Prop({ required: true })
  etiquetas: string[];

  @Prop({ required: true })
  archivoUrl: string;

  @Prop({ required: true })
  proyectoId: string;

  _id: string;
}
export const PlanoSchema = SchemaFactory.createForClass(Plano);
