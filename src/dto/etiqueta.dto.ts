import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EtiquetaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  archivoUrl: string;

  @IsOptional()
  @IsString()
  planoId?: string;

  @IsOptional()
  @IsString()
  id: string;
}
