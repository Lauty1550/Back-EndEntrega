import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileSchemaService } from 'src/service/fileSchema.service';
import { ValidationService } from 'src/service/validation.service';

@ApiTags('File-Schema')
@Controller('File-Schema')
export class FileSchemaController {
  constructor(
    private fileSchemaService: FileSchemaService,
    private validationService: ValidationService,
  ) {}

  @Get('Get-all')
  @ApiOperation({ summary: 'Obtener todos' })
  async findAll() {
    return this.fileSchemaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener por file id' })
  async getByFileId(@Param('id') id: string) {
    this.validationService.validateObjectId(id);
    return this.fileSchemaService.findById(id);
  }
}
