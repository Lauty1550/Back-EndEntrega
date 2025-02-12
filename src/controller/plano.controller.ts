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
import { PlanoService } from 'src/service/plano.service';
import { CreatePlanoDto } from 'src/dto/create.plano.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProyectoService } from 'src/service/proyecto.service';
import { ValidationService } from 'src/service/validation.service';

@ApiTags('Plano')
@Controller('Plano')
export class PlanoController {
  constructor(
    private planoService: PlanoService,
    private proyectoService: ProyectoService,
    private validationService: ValidationService,
  ) {}

  @Post('Crear')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear un plano' })
  async create(@Body() createPlanoDto: CreatePlanoDto) {
    const proyecto = await this.planoService.create(createPlanoDto);
    return { status: HttpStatus.OK, messege: 'Plano creado exitosamente' };
  }

  @Post('Agregar-Plano/:proyectoId')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear plano y asociarlo a proyecto' })
  async createPlano(
    @Param('proyectoId') proyectoId: string,
    @Body() createPlanoDto: CreatePlanoDto,
  ) {
    try {
      this.validationService.validateObjectId(proyectoId);
      createPlanoDto.proyectoId = proyectoId;
      const plano = await this.planoService.create(createPlanoDto);
      await this.proyectoService.addPlanoToProyecto(proyectoId, plano._id);
      return { status: HttpStatus.OK, messege: 'Plano vinculado exitosamente' };
    } catch (error) {
      console.error('Error crear plano', error);
      throw new BadRequestException('Error al crear plano', error.message);
    }
  }

  @Get('Get-All')
  @ApiOperation({ summary: 'Obtener todos los planos' })
  async findAll() {
    return this.planoService.findAll();
  }

  @Get('Get/:proyectoId')
  @ApiOperation({ summary: 'Obtener por proyecto ID' })
  async getPlanosByProyectoId(@Param('proyectoId') proyectoId: string) {
    return this.planoService.getPlanosByProyectoID(proyectoId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener por ID' })
  async findOne(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    const plano = await this.planoService.findOne(id);
    if (!plano) {
      throw new NotFoundException('No se encontro el plano');
    }
    return plano;
  }

  @Delete('Borrar/:id')
  @ApiOperation({ summary: 'Borrar un plano' })
  async remove(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    await this.planoService.remove(id);
    return { status: HttpStatus.OK, messege: 'Plano eliminado exitosamente' };
  }

  @Put('AgregarArchivo')
  @ApiOperation({ summary: 'Agregar archivo al plano' })
  async addFile(id: string, fileId: string) {
    this.validationService.validateObjectId(id);
    try {
      this.planoService.addFile(id, fileId);
      return { status: HttpStatus.OK, messege: 'Archivo agregado' };
    } catch (error) {
      console.error('Error al agregar archivo', error);
      throw new BadRequestException(
        'Error al agregar el archivo',
        error.message,
      );
    }
  }
}
