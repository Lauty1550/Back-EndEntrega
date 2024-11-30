import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  picture: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organizacion' })
  organizacionId: string;

  _id?: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
