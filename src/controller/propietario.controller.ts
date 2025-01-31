import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePropietarioDto } from 'src/dto/create.propietario.dto';
import { PropietarioService } from 'src/service/propietario.service';
import { ProyectoService } from 'src/service/proyecto.service';
import { ValidationService } from 'src/service/validation.service';

@ApiTags('Propietario')
@Controller('Propietario')
export class PropietarioController {
  constructor(
    private propietarioService: PropietarioService,
    private validationService: ValidationService,
    private proyectoService: ProyectoService,
  ) {}

  @Post('Agregar-Propietario/:proyectoId')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear un propietario y vincularlo a un proyecto' })
  async createPropietario(
    @Param('proyectoId') proyectoId: string,
    @Body() createPropietarioDto: CreatePropietarioDto,
  ) {
    try {
      console.log('datos: ', createPropietarioDto);
      this.validationService.validateObjectId(proyectoId);
      createPropietarioDto.proyectoId = proyectoId;
      const propietario =
        await this.propietarioService.create(createPropietarioDto);

      return { status: HttpStatus.OK, message: 'Propietario vinculado' };
    } catch (error) {
      console.error('Error al crear propietario ', error);
      throw new BadRequestException('Error al crear plano ', error.message);
    }
  }

  @Get('Get/:proyectoId')
  @ApiOperation({ summary: 'Obtener por poryecto id' })
  async getByProyectoId(@Param('proyectoId') proyectoId: string) {
    return this.propietarioService.getPropietarioByProyectoId(proyectoId);
  }

  @Get('Get-All')
  @ApiOperation({ summary: 'Obtener todos los propietarios' })
  async findAll() {
    return this.propietarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener por Id' })
  async findOne(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    const propietario = await this.propietarioService.findOne(id);
    if (!propietario) {
      throw new NotFoundException('No se encontro el propietario');
    }
    return propietario;
  }

  @Delete('Borrar/:id')
  @ApiOperation({ summary: 'Borrar un propietario' })
  async remove(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    await this.propietarioService.remove(id);
    return {
      status: HttpStatus.OK,
      messege: 'Propietario eliminado exitosamente',
    };
  }
}
