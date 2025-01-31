import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FileDocument = HydratedDocument<File>;

@Schema()
export class File {
  @Prop({ required: true })
  fileId: string;

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);
