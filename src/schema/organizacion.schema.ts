import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { spec } from 'node:test/reporters';
import { v4 as uuidv4 } from 'uuid';
import { Forma, FormaSchema } from 'src/schema/forma.schema';

export type OrganizacionDocument = HydratedDocument<Organizacion>;

@Schema()
export class Organizacion {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  direccion: string;

  @Prop({ required: true })
  datosContacto: string;

  @Prop({ type: FormaSchema, required: true })
  forma: Forma;
}
export const OrganizacionSchema = SchemaFactory.createForClass(Organizacion);
