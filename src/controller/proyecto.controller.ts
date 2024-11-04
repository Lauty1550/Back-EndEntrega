import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  BadRequestException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProyectoService } from 'src/service/proyecto.service';
import { CreateProyectoDto } from 'src/dto/create.proyecto.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isValidObjectId } from 'mongoose';

@ApiTags('Proyecto')
@Controller('Proyecto')
export class ProyectoController {
  constructor(private proyectoService: ProyectoService) {}

  @Post('Crear')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear un proyecto' })
  async create(@Body() createProyectoDto: CreateProyectoDto) {
    const proyecto = await this.proyectoService.create(createProyectoDto);
    return { status: HttpStatus.OK, message: 'Proyecto creado exitosamente' };
  }

  @Get('Get-All')
  @ApiOperation({ summary: 'Obtener todos los proyectos' })
  async findAll() {
    return this.proyectoService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener por user ID' })
  async getProyectoByUserId(@Param('userId') userId: string) {
    return this.proyectoService.getProyectoByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener por id' })
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no es valido`);
    }
    const proyecto = await this.proyectoService.findOne(id);
    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }
    return { status: HttpStatus.OK, proyecto };
  }

  @Delete('Borrar/:id')
  @ApiOperation({ summary: 'Borrar un proyecto' })
  async remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no es valido`);
    }
    const result = await this.proyectoService.remove(id);
    if (result.deletedCount === 0) {
      throw new NotFoundException('No se encontro el proyecto');
    }
    return {
      status: HttpStatus.OK,
      message: 'Proyecto eliminado exitosamente',
    };
  }

  @Put('Update/:id')
  @ApiOperation({ summary: 'Actualizar un proyecto' })
  @UsePipes(new ValidationPipe()) // Valida la entrada usando DTO
  async update(
    @Param('id') id: string,
    @Body() createProyectoDto: CreateProyectoDto,
  ) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no es válido`);
    }

    const proyectoActualizado = await this.proyectoService.update(
      id,
      createProyectoDto,
    );

    if (!proyectoActualizado) {
      throw new NotFoundException(`Proyecto con id ${id} no encontrado`);
    }

    return {
      status: HttpStatus.OK,
      message: 'Proyecto actualizado exitosamente',
      proyecto: proyectoActualizado,
    };
  }
}
