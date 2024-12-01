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
  forwardRef,
  Inject,
} from '@nestjs/common';
import { OrganizacionService } from 'src/service/organizacion.service';
import { CreateOrganizacionDto } from 'src/dto/create.organizacion.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrganizacionDto } from 'src/dto/organizacion.dto';
import { ValidationService } from 'src/service/validation.service';
import { UserService } from 'src/service/user.service';

@ApiTags('Organizacion')
@Controller('Organizacion')
export class OrganizacionController {
  constructor(
    private organizacionService: OrganizacionService,
    private validationService: ValidationService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

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
    this.validationService.validateObjectId(id);
    const organizacion = await this.organizacionService.findOne(id);
    if (!organizacion) {
      throw new NotFoundException('Organizacion no encontrada');
    }
    return { status: HttpStatus.OK, organizacion };
  }

  @Delete('Borrar/:id')
  @ApiOperation({ summary: 'Borrar una organizacion' })
  async remove(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    const organizacion = await this.organizacionService.findOne(id);
    if (!organizacion) {
      throw new NotFoundException('Organizacion no encontrada');
    }
    if (organizacion.users && organizacion.users.length > 0) {
      for (const user of organizacion.users) {
        console.log(`Procesando usuario con ID: ${user.id}`);
        this.userService.removeUserFromOrg(user.id);
      }
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

  @Put('Update/:id')
  @ApiOperation({ summary: 'Actualizar una organizacion' })
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() organizacionDto: OrganizacionDto,
  ) {
    this.validationService.validateObjectId(id);
    const organizacionActualizado = await this.organizacionService.update(
      id,
      organizacionDto,
    );
    if (!organizacionActualizado) {
      throw new NotFoundException(`Organizacion con id ${id} no encontrada`);
    }
    return {
      status: HttpStatus.OK,
      message: 'Organizacion actualizada',
      organizacion: organizacionActualizado,
    };
  }
}
