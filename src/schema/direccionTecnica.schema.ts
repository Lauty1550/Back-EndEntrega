import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DireccionTecnicaDocument = HydratedDocument<DireccionTecnica>;

@Schema()
export class DireccionTecnica {
  @Prop({ required: true })
  nombreCompleto: string;

  @Prop({ required: false })
  matriculaProvincial?: string;

  @Prop({ required: false })
  matriculaMunicipal?: string;

  @Prop({ required: false })
  dni?: number;

  @Prop({ required: false })
  domicilio?: string;

  @Prop({ required: true })
  proyectoId: string;

  _id?: string;
}

export const DireccionTecnicaSchema =
  SchemaFactory.createForClass(DireccionTecnica);
