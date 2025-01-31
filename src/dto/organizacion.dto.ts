import { IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator';
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

  @IsOptional()
  users?: UserOrganizacionDto[];
}
