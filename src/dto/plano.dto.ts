import { IsString, IsArray, IsOptional } from 'class-validator';

export class PlanoDto {
  @IsString()
  especialidad: string;

  @IsArray()
  etiquetas: string[];

  @IsString()
  archivoUrl: string;

  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  proyectoId?: string;
}
