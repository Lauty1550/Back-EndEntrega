import {
  IsString,
  IsInt,
  Min,
  Max,
  isString,
  isInt,
  IsNotEmpty,
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

  @IsNotEmpty()
  forma: CreateFormaDto;
}
