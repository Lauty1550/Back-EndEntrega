import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFileSchemaDto } from 'src/dto/create.fileSchema.dto';
import { FileSchemaDto } from 'src/dto/fileSchema.dto';
import { File } from 'src/schema/file.schema';

@Injectable()
export class FileSchemaService {
  constructor(@InjectModel(File.name) private fileModel: Model<File>) {}

  private mapToDto(file: File): FileSchemaDto {
    return {
      fileName: file.fileName,
      createdAt: file.createdAt,
    };
  }

  async create(createFileDto: CreateFileSchemaDto): Promise<File> {
    const file = new this.fileModel(createFileDto);
    return file.save();
  }

  async findAll() {
    return this.fileModel.find().exec();
  }

  async findById(id: string): Promise<FileSchemaDto> {
    const file = await this.fileModel.findOne({ fileId: id }).exec();
    return this.mapToDto(file);
  }
}
