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
} from 'class-validator';
import { TipoDestino } from 'src/enum/tipo.destino.enum';
import { TipoObra } from 'src/enum/tipo.obra.enum';
import { Plano } from 'src/schema/plano.schema';
import { CreatePlanoDto } from './create.plano.dto';
import { PlanoDto } from './plano.dto';

export class ProyectoDto {
  @IsOptional()
  @IsString()
  id?: string;

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
  planos: PlanoDto[];

  @IsOptional()
  userId: string;
}
