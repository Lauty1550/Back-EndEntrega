import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Forma, FormaSchema } from 'src/schema/forma.schema';
import { User } from './user.schema';

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];
}
export const OrganizacionSchema = SchemaFactory.createForClass(Organizacion);
