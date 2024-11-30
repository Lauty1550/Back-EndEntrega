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
} from 'class-validator';
import { CreateFormaDto } from './create.forma.dto';

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
  forma?: CreateFormaDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  users?: string[];
}
