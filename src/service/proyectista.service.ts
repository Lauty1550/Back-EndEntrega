import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProyectistaDto } from 'src/dto/createProyectista.dto';
import { Proyectista } from 'src/schema/proyectista.schema';

@Injectable()
export class ProyectistaService {
  constructor(
    @InjectModel(Proyectista.name) private proyectistaModel: Model<Proyectista>,
  ) {}

  async create(createProyectista: CreateProyectistaDto): Promise<Proyectista> {
    const newProyectista = new this.proyectistaModel(createProyectista);
    return newProyectista.save();
  }

  async findAll(): Promise<Proyectista[]> {
    return this.proyectistaModel.find().exec();
  }

  async findOne(id: string): Promise<Proyectista | null> {
    const proyectista = await this.proyectistaModel.findById(id).exec();
    return proyectista;
  }

  async getProyectistasByProyectoId(
    proyectoId: string,
  ): Promise<Proyectista[] | null> {
    const proyectista = await this.proyectistaModel.find({ proyectoId }).exec();
    return proyectista;
  }

  async removeAllByProyectoId(id: string) {
    const proyectistas = await this.getProyectistasByProyectoId(id);
    for (const proy of proyectistas) {
      this.remove(proy._id);
    }
  }

  async remove(id: string) {
    return this.proyectistaModel.deleteOne({ _id: id }).exec();
  }
}
