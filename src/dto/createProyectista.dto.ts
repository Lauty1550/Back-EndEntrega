import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProyectistaDto {
  @IsNotEmpty()
  @IsString()
  nombreCompleto: string;

  @IsOptional()
  @IsString()
  matriculaProvincial?: string;

  @IsOptional()
  @IsString()
  matriculaMunicipal?: string;

  @IsOptional()
  @IsNumber()
  dni?: number;

  @IsOptional()
  @IsString()
  domicilio?: string;

  @IsOptional()
  @IsString()
  proyectoId?: string;
}
