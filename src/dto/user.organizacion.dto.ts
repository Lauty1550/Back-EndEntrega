import { IsOptional, IsString } from 'class-validator';

export class UserOrganizacionDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;
}
