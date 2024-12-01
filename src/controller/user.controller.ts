import {
  BadRequestException,
  Body,
  Controller,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isValidObjectId } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { CreateOrganizacionDto } from 'src/dto/create.organizacion.dto';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { UserDto } from 'src/dto/user.dto';
import { Organizacion } from 'src/schema/organizacion.schema';
import { OrganizacionService } from 'src/service/organizacion.service';
import { UserService } from 'src/service/user.service';
import { ValidationService } from 'src/service/validation.service';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(forwardRef(() => OrganizacionService))
    private organizacionService: OrganizacionService,
    private validationService: ValidationService,
  ) {}

  @Post('Crear')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear un usuario' })
  async create(@Body() createUserDto: CreateUserDto) {
    const userOptional = await this.userService.findByAuth0Id(createUserDto.id);
    if (userOptional) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Usuario ya existente',
      };
    }
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

  @Put('Agregar-User/:organizacionId/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Asociar usuario a organizacion' })
  async createPlano(
    @Param('organizacionId') organizacionId: string,
    @Param('id') id: string,
  ) {
    try {
      this.validationService.validateObjectId(id);
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      await this.organizacionService.addUserToOrganizacion(organizacionId, id);
      await this.userService.updateUserOrganizacion(id, organizacionId);
      return {
        status: HttpStatus.OK,
        messege: 'Usuario vinculado exitosamente',
      };
    } catch (e) {
      console.error('Error:', e); // Para depuración
      return {
        status: HttpStatus.BAD_REQUEST,
        messege: 'Ocurrió un error',
        error: e.response || e.message || 'Error desconocido', // Devuelve más detalles del error
      };
    }
  }

  @Get('Get-All')
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener por id' })
  async findOne(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return { status: HttpStatus.OK, user };
  }

  @Get('/Auth0Id/:id')
  @ApiOperation({ summary: 'Obtener por auth0Id' })
  async findByAuth0Id(@Param('id') id: string) {
    const user = await this.userService.findByAuth0Id(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  @Put('Remove-From-Org/:id')
  @ApiOperation({ summary: 'Eliminar usuario de la organizacion' })
  async removeFromOrg(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    try {
      const user = await this.userService.removeUserFromOrg(id);
      return { status: HttpStatus.OK, message: 'Usuario desvinculado' };
    } catch (error) {
      throw error('Error al desvincular', error);
    }
  }
}
