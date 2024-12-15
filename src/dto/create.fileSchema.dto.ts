import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateFileSchemaDto {
  @IsNotEmpty()
  @IsString()
  fileId: string;

  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}
