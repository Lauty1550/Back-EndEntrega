import { Optional } from '@nestjs/common';
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
import { TipoDestino } from 'src/enum/tipo.destino.enum';
import { TipoObra } from 'src/enum/tipo.obra.enum';

export class CreateProyectoDto {
  @IsOptional()
  @IsString()
  nombreProyecto: string;

  @IsOptional()
  @IsString()
  expediente: string;

  @IsEnum(TipoObra)
  obra: TipoObra;

  @IsEnum(TipoDestino)
  destino: TipoDestino;

  @IsString()
  ubicacion: string;

  @IsString()
  escala: string;

  @IsString()
  antecedente: string;

  @IsOptional()
  @IsBoolean()
  aprobacion: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  planos: string[];
}
