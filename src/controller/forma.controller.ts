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
import { FormaService } from 'src/service/forma.service';
import { CreateFormaDto } from 'src/dto/create.forma.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isValidObjectId } from 'mongoose';
import { ValidationService } from 'src/service/validation.service';

@ApiTags('Forma')
@Controller('Forma')
export class FormaController {
  constructor(
    private formaService: FormaService,
    private validationService: ValidationService,
  ) {}

  @Post('Crear')
  @ApiOperation({ summary: 'Crear una forma' })
  async create(@Body() createFormaDto: CreateFormaDto) {
    const forma = await this.formaService.create(createFormaDto);
    return { status: HttpStatus.OK, messege: 'Forma Creada Existosamente' };
  }

  @Get('Get-All')
  @ApiOperation({ summary: 'Obtener todas las formas' })
  async findAll() {
    return this.formaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener por id' })
  async findOne(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    const forma = await this.formaService.findOne(id);
    if (!forma) {
      throw new NotFoundException('Forma no encontrada');
    }
    return { status: HttpStatus.OK, forma };
  }

  @Delete('Borrar/:id')
  @ApiOperation({ summary: 'Eliinar una forma' })
  async remove(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    const result = await this.formaService.remove(id);

    if (result.deletedCount === 0) {
      throw new NotFoundException('forma no encontrada');
    }
    return { status: HttpStatus.OK, messege: 'Forma eliminada exitosamente' };
  }
}
