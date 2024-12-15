import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class FileSchemaDto {
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}
