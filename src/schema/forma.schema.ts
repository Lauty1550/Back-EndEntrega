import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { spec } from 'node:test/reporters';
import { v4 as uuidv4 } from 'uuid';

export type FormaDocument = HydratedDocument<Forma>;

@Schema()
export class Forma {
  @Prop({ required: true })
  letra: string;

  @Prop({ required: true })
  numero: number;

  @Prop({ required: true })
  anio: Date;

  @Prop({ required: true })
  partida: string;
}
export const FormaSchema = SchemaFactory.createForClass(Forma);
