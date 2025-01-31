import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDireccionTecnicaDto } from 'src/dto/create.direccionTecnica.dto';
import { DireccionTecnica } from 'src/schema/direccionTecnica.schema';

@Injectable()
export class DireccionTecnicaService {
  constructor(
    @InjectModel(DireccionTecnica.name)
    private direccionTecnicaModel: Model<DireccionTecnica>,
  ) {}

  async create(
    createDireccionTecnica: CreateDireccionTecnicaDto,
  ): Promise<DireccionTecnica> {
    const newDireccionTecnica = new this.direccionTecnicaModel(
      createDireccionTecnica,
    );
    return newDireccionTecnica.save();
  }

  async findAll(): Promise<DireccionTecnica[]> {
    return this.direccionTecnicaModel.find().exec();
  }

  async findOne(id: string): Promise<DireccionTecnica | null> {
    const direccionTecnica = await this.direccionTecnicaModel
      .findById(id)
      .exec();
    return direccionTecnica;
  }

  async getDireccionTecnicaByProyectoId(
    proyectoId: string,
  ): Promise<DireccionTecnica[] | null> {
    const direccionTecnica = await this.direccionTecnicaModel
      .find({ proyectoId })
      .exec();
    return direccionTecnica;
  }

  async removeAllByProyectoId(id: string) {
    const direccionTecnica = await this.getDireccionTecnicaByProyectoId(id);
    for (const dir of direccionTecnica) {
      this.remove(dir._id);
    }
  }

  async remove(id: string) {
    return this.direccionTecnicaModel.deleteOne({ _id: id }).exec();
  }
}
