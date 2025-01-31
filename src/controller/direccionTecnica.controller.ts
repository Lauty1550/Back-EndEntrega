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
import { CreateDireccionTecnicaDto } from 'src/dto/create.direccionTecnica.dto';
import { DireccionTecnicaService } from 'src/service/direccionTecnica.service';
import { ProyectoService } from 'src/service/proyecto.service';
import { ValidationService } from 'src/service/validation.service';

@ApiTags('Direccion Tecnica')
@Controller('Direccion-tecnica')
export class DireccionTecnicaController {
  constructor(
    private direccionTecnicaService: DireccionTecnicaService,
    private validationService: ValidationService,
    private proyectoService: ProyectoService,
  ) {}

  @Post('Agregar-DireccionTecnica/:proyectoId')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear direccion tecnica y vincular a proyecto' })
  async createDireccionTecnica(
    @Param('proyectoId') proyectoId: string,
    @Body() createDireccionTecnicaDto: CreateDireccionTecnicaDto,
  ) {
    try {
      this.validationService.validateObjectId(proyectoId);
      createDireccionTecnicaDto.proyectoId = proyectoId;
      const direccionTecnica = await this.direccionTecnicaService.create(
        createDireccionTecnicaDto,
      );
      await this.proyectoService.addDireccionTecnicaToProyecto(
        proyectoId,
        direccionTecnica._id,
      );
      return { status: HttpStatus.OK, message: 'Direccion tecnica vinculada' };
    } catch (error) {
      console.error('Error al crear direccion tecnica ', error);
      throw new BadRequestException(
        'Error al crear direccion tecnica ',
        error.message,
      );
    }
  }

  @Get('Get/:proyectoId')
  @ApiOperation({ summary: 'Obtener por poryecto id' })
  async getByProyectoId(@Param('proyectoId') proyectoId: string) {
    return this.direccionTecnicaService.getDireccionTecnicaByProyectoId(
      proyectoId,
    );
  }

  @Get('Get-All')
  @ApiOperation({ summary: 'Obtener todas las direcciones tecnicas' })
  async findAll() {
    return this.direccionTecnicaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener por Id' })
  async findOne(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    const direccionTecnica = await this.direccionTecnicaService.findOne(id);
    if (!direccionTecnica) {
      throw new NotFoundException('No se encontro la direccion tecnica');
    }
    return direccionTecnica;
  }

  @Delete('Borrar/:id')
  @ApiOperation({ summary: 'Borrar una direccion' })
  async remove(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    await this.direccionTecnicaService.remove(id);
    return {
      status: HttpStatus.OK,
      messege: 'Direccion eliminada exitosamente',
    };
  }
}
