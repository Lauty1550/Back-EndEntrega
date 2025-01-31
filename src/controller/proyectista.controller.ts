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
import { CreateProyectistaDto } from 'src/dto/createProyectista.dto';
import { ProyectistaService } from 'src/service/proyectista.service';
import { ProyectoService } from 'src/service/proyecto.service';
import { ValidationService } from 'src/service/validation.service';

@ApiTags('Proyectista')
@Controller('Proyectista')
export class ProyectistaController {
  constructor(
    private proyectistaService: ProyectistaService,
    private validationService: ValidationService,
    private proyectoService: ProyectoService,
  ) {}

  @Post('Agregar-Proyectista/:proyectoId')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear un proyectista y vincularlo a un proyecto' })
  async createProyectista(
    @Param('proyectoId') proyectoId: string,
    @Body() createProyectistaDto: CreateProyectistaDto,
  ) {
    try {
      this.validationService.validateObjectId(proyectoId);
      createProyectistaDto.proyectoId = proyectoId;
      const proyectista =
        await this.proyectistaService.create(createProyectistaDto);
      await this.proyectoService.addproyectistaToProyecto(
        proyectoId,
        proyectista._id,
      );
      return { status: HttpStatus.OK, message: 'Proyectista vinculado' };
    } catch (error) {
      console.error('Error al crear proyectista ', error);
      throw new BadRequestException(
        'Error al crear proyectista ',
        error.message,
      );
    }
  }

  @Get('Get/:proyectoId')
  @ApiOperation({ summary: 'Obtener por poryecto id' })
  async getByProyectoId(@Param('proyectoId') proyectoId: string) {
    return this.proyectistaService.getProyectistasByProyectoId(proyectoId);
  }

  @Get('Get-All')
  @ApiOperation({ summary: 'Obtener todos los proyectistas' })
  async findAll() {
    return this.proyectistaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener por Id' })
  async findOne(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    const proyectista = await this.proyectistaService.findOne(id);
    if (!proyectista) {
      throw new NotFoundException('No se encontro el proyectista');
    }
    return proyectista;
  }

  @Delete('Borrar/:id')
  @ApiOperation({ summary: 'Borrar un proyectista' })
  async remove(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    await this.proyectistaService.remove(id);
    return {
      status: HttpStatus.OK,
      messege: 'Proyectista eliminado exitosamente',
    };
  }
}
