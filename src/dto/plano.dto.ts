import { IsString, IsArray, IsOptional, IsNotEmpty } from 'class-validator';

export class PlanoDto {
  @IsString()
  especialidad: string;

  @IsOptional()
  @IsArray()
  etiquetas: string[];

  @IsString()
  archivoUrl: string;

  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  proyectoId?: string;

  @IsNotEmpty()
  @IsString()
  tipoArchivo: string;
}
