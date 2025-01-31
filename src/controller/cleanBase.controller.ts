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
    // Lista de colecciones a borrar
    const coleccionesEspecificas = [
      'formas',
      'proyectos',
      'planos',
      'organizacions',
      'users',
    ];

    for (const coleccion of coleccionesEspecificas) {
      const elemento = this.connection.collections[coleccion];
      if (elemento) {
        await elemento.deleteMany({});
        //   console.log(`Colección ${coleccion} limpiada.`);
      } else {
        //  console.log(`Colección ${coleccion} no encontrada.`);
      }
    }

    return { status: HttpStatus.OK, messege: 'Base limpiada' };
  }
}
