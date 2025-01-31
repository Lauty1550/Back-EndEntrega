import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Propietario } from 'src/schema/propietario.schema';
import { Model } from 'mongoose';
import { CreatePropietarioDto } from 'src/dto/create.propietario.dto';

@Injectable()
export class PropietarioService {
  constructor(
    @InjectModel(Propietario.name) private propietarioModel: Model<Propietario>,
  ) {}

  async create(createPropietario: CreatePropietarioDto): Promise<Propietario> {
    const newPropietario = new this.propietarioModel(createPropietario);
    return newPropietario.save();
  }

  async findAll(): Promise<Propietario[]> {
    return this.propietarioModel.find().exec();
  }

  async findOne(id: string): Promise<Propietario | null> {
    const propietario = await this.propietarioModel.findById(id).exec();
    return propietario;
  }

  async getPropietarioByProyectoId(
    proyectoId: string,
  ): Promise<Propietario | null> {
    const propietario = await this.propietarioModel
      .findOne({ proyectoId })
      .exec();
    return propietario;
  }

  async removeAllByProyectoId(id: string) {
    const propietario = await this.getPropietarioByProyectoId(id);
    if (propietario) {
      this.remove(propietario._id);
    }
  }

  async remove(id: string) {
    return this.propietarioModel.deleteOne({ _id: id }).exec();
  }
}
