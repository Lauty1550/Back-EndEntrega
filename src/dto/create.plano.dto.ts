import {
  IsString,
  IsInt,
  Min,
  Max,
  isString,
  isInt,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreatePlanoDto {
  @IsString()
  especialidad: string;

  @IsArray()
  etiquetas: string[];

  @IsString()
  archivoUrl: string;

  @IsOptional()
  @IsString()
  proyectoId: string;
}
