import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EtiquetaDto } from 'src/dto/etiqueta.dto';
import { EtiquetaService } from 'src/service/etiqueta.service';
import { PlanoService } from 'src/service/plano.service';
import { ValidationService } from 'src/service/validation.service';

@ApiTags('Etiqueta')
@Controller('Etiqueta')
export class EtiquetaController {
  constructor(
    private etiquetaService: EtiquetaService,
    private validationService: ValidationService,
    private planoService: PlanoService,
  ) {}

  @Post('Crear')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear una etiqueta' })
  async create(@Body() etiquetaDto: EtiquetaDto) {
    await this.etiquetaService.create(etiquetaDto);
    return { status: HttpStatus.OK, messege: 'Etiqueta creada exitosamente' };
  }

  @Post('Agregar-Etiqueta/:planoId')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear etiqueta y vincularla al plano' })
  async createEtiqueta(
    @Param('planoId') planoId: string,
    @Body() etiquetaDto: EtiquetaDto,
  ) {
    try {
      this.validationService.validateObjectId(planoId);
      etiquetaDto.planoId = planoId;
      const etiqueta = await this.etiquetaService.create(etiquetaDto);
      await this.planoService.addEtiquetaToPlano(planoId, etiqueta._id);
      return {
        status: HttpStatus.OK,
        messege: 'Etiqueta vinculada exitosamente',
      };
    } catch (error) {
      console.error('Error al crear etiqueta', error);
      throw new BadRequestException('Error al crear etiqueta ', error.message);
    }
  }

  @Delete('Borrar/:etiquetaId')
  @ApiOperation({ summary: 'Borrar una etiqueta' })
  async remove(@Param('etiquetaId') etiquetaId: string) {
    this.validationService.validateObjectId(etiquetaId);
    await this.etiquetaService.remove(etiquetaId);
    return { status: HttpStatus.OK, messege: 'Etiqueta eliminada' };
  }
}
