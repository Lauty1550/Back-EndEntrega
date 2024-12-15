import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';
import { ValidationService } from './validation.service';
import { FileSchemaService } from './fileSchema.service';

@Injectable()
export class GridFsService implements OnModuleInit {
  private bucket: GridFSBucket;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    private fileSchemaService: FileSchemaService,
  ) {}

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

    const fileUrl = await this.fileSchemaService.findById(fileId);
    const fileName = fileUrl.fileName;
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    let fileType = 'application/octet-stream'; // Default
    if (fileExtension === 'jpeg') {
      fileType = 'image/jpeg';
    } else if (fileExtension === 'png') {
      fileType = 'image/png';
    } else if (fileExtension === 'pdf') {
      fileType = 'application/pdf';
    }

    res.setHeader('Content-Type', fileType);

    return downloadStream.pipe(res);
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
