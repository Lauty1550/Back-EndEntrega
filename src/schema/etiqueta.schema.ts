import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Etiqueta {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  archivoUrl: string;

  @Prop({ required: true })
  planoId: string;

  _id: string;
}

export const EtiquetaSchema = SchemaFactory.createForClass(Etiqueta);
