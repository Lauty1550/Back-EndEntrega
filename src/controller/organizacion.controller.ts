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
import { OrganizacionService } from 'src/service/organizacion.service';
import { CreateOrganizacionDto } from 'src/dto/create.organizacion.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isValidObjectId } from 'mongoose';

@ApiTags('Organizacion')
@Controller('Organizacion')
export class OrganizacionController {
  constructor(private organizacionService: OrganizacionService) {}

  @Post('Crear')
  @ApiOperation({ summary: 'Crear una organizacion' })
  async create(@Body() createOrganizacionDto: CreateOrganizacionDto) {
    const organizacion = await this.organizacionService.create(
      createOrganizacionDto,
    );
    return {
      status: HttpStatus.OK,
      messege: 'Organizacion Creada Exitosamente',
    };
  }

  @Get('Get-All')
  @ApiOperation({ summary: 'Obtener todas las organizaciones' })
  async findAll() {
    return this.organizacionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener por ID' })
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no es valido`);
    }
    const organizacion = await this.organizacionService.findOne(id);
    if (!organizacion) {
      throw new NotFoundException('Organizacion no encontrada');
    }
    return { status: HttpStatus.OK, organizacion };
  }

  @Delete('Borrar/:id')
  @ApiOperation({ summary: 'Borrar una organizacion' })
  async remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no es valido`);
    }
    const result = await this.organizacionService.remove(id);

    if (result.deletedCount === 0) {
      throw new NotFoundException('Organizacion no encontrada');
    }
    return {
      status: HttpStatus.OK,
      messege: 'Organizacion eliminada exitosamente',
    };
  }
}
