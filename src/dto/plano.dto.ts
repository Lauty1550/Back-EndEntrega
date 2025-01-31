import { IsString, IsArray, IsOptional, IsNotEmpty } from 'class-validator';
import { EtiquetaDto } from './etiqueta.dto';

export class PlanoDto {
  @IsString()
  especialidad: string;

  @IsOptional()
  etiquetas?: EtiquetaDto[];

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
