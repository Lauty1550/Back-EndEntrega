import { IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  picture: string;

  @IsOptional()
  @IsString()
  organizacionId?: string;

  @IsOptional()
  @IsString()
  organizacionName?: string;
}
