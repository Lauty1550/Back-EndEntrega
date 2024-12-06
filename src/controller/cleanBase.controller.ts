import { Controller, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Connection } from 'mongoose';

@ApiTags('Admin')
@Controller('Admin')
export class CleanDataBaseController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Delete('clear-database')
  @ApiOperation({ summary: 'Limpiar base de datos (solo test)' })
  async clearDataBase(): Promise<any> {
    if (process.env.NODE_ENV !== 'start:test') {
      throw new HttpException(
        'Esta operación solo está permitida en entorno de pruebas',
        HttpStatus.BAD_REQUEST,
      );
    }

    const colecciones = Object.keys(this.connection.collections);
    for (const coleccion of colecciones) {
      const elemento = this.connection.collections[coleccion];
      await elemento.deleteMany({});
    }

    return { status: HttpStatus.OK, messege: 'Base limpiada' };
  }
}
