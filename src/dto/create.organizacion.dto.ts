import {
  IsString,
  IsInt,
  Min,
  Max,
  isString,
  isInt,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateOrganizacionDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  datosContacto: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  users?: string[];

  @IsNotEmpty()
  @IsString()
  letra: string;

  @IsNotEmpty()
  @IsNumber()
  numero: number;

  @IsNotEmpty()
  @IsNumber()
  anio: number;

  @IsNotEmpty()
  @IsString()
  partida: string;
}
