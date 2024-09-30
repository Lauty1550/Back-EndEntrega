import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plano } from 'src/schema/plano.schema';
import { CreatePlanoDto } from 'src/dto/create.plano.dto';

@Injectable()
export class PlanoService {
  constructor(@InjectModel(Plano.name) private planoModel: Model<Plano>) {}

  async create(createPlanoDto: CreatePlanoDto): Promise<Plano> {
    const newPlano = new this.planoModel(createPlanoDto);
    return newPlano.save();
  }

  async findAll(): Promise<Plano[]> {
    return this.planoModel.find().exec();
  }

  async findOne(id: string): Promise<Plano | null> {
    return this.planoModel.findById(id).exec();
  }

  async remove(id: string): Promise<any> {
    return this.planoModel.deleteOne({ _id: id }).exec();
  }
}
