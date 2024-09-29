import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Forma } from 'src/schema/forma.schema';
import { CreateFormaDto } from 'src/dto/create.forma.dto';

@Injectable()
export class FormaService {
  constructor(@InjectModel(Forma.name) private formaModel: Model<Forma>) {}

  async create(createFormaDto: CreateFormaDto): Promise<Forma> {
    const newForma = new this.formaModel(createFormaDto);
    return newForma.save();
  }

  async findAll(): Promise<Forma[]> {
    return this.formaModel.find().exec();
  }

  async findOne(id: string): Promise<Forma | null> {
    return this.formaModel.findById(id).exec();
  }
  async remove(id: string): Promise<any> {
    return this.formaModel.deleteOne({ _id: id }).exec();
  }
}
