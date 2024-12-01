import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';
import { ValidationService } from './validation.service';

@Injectable()
export class GridFsService implements OnModuleInit {
  private bucket: GridFSBucket;
  private validationService: ValidationService;

  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    // Inicializar GridFSBucket solo después de que la conexión esté lista
    this.bucket = new GridFSBucket(this.connection.db, {
      bucketName: 'uploads',
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uploadStream = this.bucket.openUploadStream(file.originalname);
    uploadStream.end(file.buffer);
    return uploadStream.id.toString(); // Retorna el ID del archivo subido
  }

  async downloadFile(fileId: string, res: any) {
    const downloadStream = this.bucket.openDownloadStream(new ObjectId(fileId));
    downloadStream.pipe(res);
  }

  async deleteFile(fileId: string): Promise<void> {
    try {
      const fileObjectId = new ObjectId(fileId);
      // Intentamos obtener el archivo para ver si existe
      const file = await this.bucket.find({ _id: fileObjectId }).toArray();
      if (file.length === 0) {
        throw new NotFoundException(`Archivo con id ${fileId} no encontrado`);
      }
      // El archivo existe, lo eliminamos
      await this.bucket.delete(fileObjectId);
      // Si todo va bien, no necesitamos retornar nada
      return;
    } catch (error) {
      console.error('Error al eliminar el archivo', error);
      throw new Error('No se pudo eliminar el archivo');
    }
  }
}
