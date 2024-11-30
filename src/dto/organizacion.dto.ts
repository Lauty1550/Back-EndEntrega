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

import { UserOrganizacionDto } from './user.organizacion.dto';

export class OrganizacionDto {
  @IsOptional()
  @IsString()
  id?: string;

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
  users?: UserOrganizacionDto[];
}
