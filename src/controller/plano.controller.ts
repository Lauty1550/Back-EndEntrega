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
} from '@nestjs/common';
import { PlanoService } from 'src/service/plano.service';
import { CreatePlanoDto } from 'src/dto/create.plano.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isValidObjectId } from 'mongoose';
import { ProyectoService } from 'src/service/proyecto.service';

@ApiTags('Plano')
@Controller('Plano')
export class PlanoController {
  constructor(
    private planoService: PlanoService,
    private proyectoService: ProyectoService,
  ) {}

  @Post('Crear')
  @ApiOperation({ summary: 'Crear un plano' })
  async create(@Body() createPlanoDto: CreatePlanoDto) {
    const proyecto = await this.planoService.create(createPlanoDto);
    return { status: HttpStatus.OK, messege: 'Plano creado exitosamente' };
  }

  @Post('Agregar-Plano/:proyectoId')
  @ApiOperation({ summary: 'Crear plano y asociarlo a proyecto' })
  async createPlano(
    @Param('proyectoId') proyectoId: string,
    @Body() createPlanoDto: CreatePlanoDto,
  ) {
    createPlanoDto.proyectoId = proyectoId;
    const plano = await this.planoService.create(createPlanoDto);
    await this.proyectoService.addPlanoToProyecto(proyectoId, plano._id);
    return { status: HttpStatus.OK, messege: 'Plano vinculado exitosamente' };
  }

  @Get('Get-All')
  @ApiOperation({ summary: 'Obtener todos los planos' })
  async findAll() {
    return this.planoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener por ID' })
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no es valido`);
    }
    const plano = await this.planoService.findOne(id);
    if (!plano) {
      throw new NotFoundException('No se encontro el plano');
    }
    return { status: HttpStatus.OK, plano };
  }
  @Delete('Borrar/:id')
  @ApiOperation({ summary: 'Borrar un plano' })
  async remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no es valido`);
    }
    const result = await this.planoService.remove(id);
    if (result.deletedCount === 0) {
      throw new NotFoundException('No se encontro el plano');
    }
    return { status: HttpStatus.OK, messege: 'Plano eliminado exitosamente' };
  }
}
