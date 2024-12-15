import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
