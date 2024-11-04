import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { userService } from 'src/service/user.service';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private userService: userService) {}

  @Post('Crear')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear un usuario' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return { status: HttpStatus.OK, message: 'Usuario creado' };
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Error al crear usuario',
        e,
      };
    }
  }

  @Get('Get-All')
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  async findAll() {
    return this.userService.findAll();
  }
}
