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
import { UserDto } from './user.dto';
import { UserOrganizacionDto } from './user.organizacion.dto';

export class OrganizacionDto {
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

  @IsOptional()
  users: UserOrganizacionDto[];
}
