import {
  IsString,
  IsInt,
  Min,
  Max,
  isString,
  isInt,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class CreateFormaDto {
  @IsNotEmpty()
  @IsString()
  letra: string;

  @IsNotEmpty()
  @IsInt()
  numero: number;

  @IsNotEmpty()
  @IsDate()
  anio: Date;

  @IsNotEmpty()
  @IsString()
  partida: string;
}
