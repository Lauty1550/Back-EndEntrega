import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePropietarioDto {
  @IsNotEmpty()
  @IsString()
  nombreCompleto: string;

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
