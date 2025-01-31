import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TipoDestino } from 'src/enum/tipo.destino.enum';
import { TipoObra } from 'src/enum/tipo.obra.enum';
import { Plano } from './plano.schema';
import { Propietario } from './propietario.schema';
import { Proyectista } from './proyectista.schema';
import { DireccionTecnica } from './direccionTecnica.schema';

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
  aprobacion: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plano' }] })
  planos: Plano[];

  @Prop({ required: false })
  propietario: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Proyectista' }],
  })
  proyectistas: Proyectista[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DireccionTecnica' }],
  })
  direccionTecnica: DireccionTecnica[];

  @Prop({ required: false })
  userId: string;

  @Prop({ required: false })
  organizacionId: string;

  _id?: string;
}
export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);
