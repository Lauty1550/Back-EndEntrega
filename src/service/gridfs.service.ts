import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';

@Injectable()
export class GridFsService implements OnModuleInit {
  private bucket: GridFSBucket;

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
}
