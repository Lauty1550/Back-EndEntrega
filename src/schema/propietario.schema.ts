import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PropietarioDocument = HydratedDocument<Propietario>;

@Schema()
export class Propietario {
  @Prop({ required: true })
  nombreCompleto: string;

  @Prop({ required: false })
  dni?: number;

  @Prop({ required: false })
  domicilio?: string;

  @Prop({ required: true })
  proyectoId: string;

  _id?: string;
}

export const PropietarioSchema = SchemaFactory.createForClass(Propietario);
