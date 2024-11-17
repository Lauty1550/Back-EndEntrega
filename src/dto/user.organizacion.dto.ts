import { IsOptional, IsString } from 'class-validator';

export class UserOrganizacionDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;
}
