import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plano } from 'src/schema/plano.schema';
import { CreatePlanoDto } from 'src/dto/create.plano.dto';
import { PlanoDto } from 'src/dto/plano.dto';

@Injectable()
export class PlanoService {
  constructor(@InjectModel(Plano.name) private planoModel: Model<Plano>) {}

  private mapToDto(plano: Plano): PlanoDto {
    return {
      id: plano._id.toString(),
      archivoUrl: plano.archivoUrl,
      especialidad: plano.especialidad,
      etiquetas: plano.etiquetas,
    };
  }

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

  async getPlanosByProyectoID(proyectoId: string): Promise<PlanoDto[]> {
    const planos = this.planoModel.find({ proyectoId }).exec();
    return (await planos).map((plano) => this.mapToDto(plano));
  }

  async addFile(id: string, fileId: string): Promise<any> {
    try {
      const plano = await this.planoModel.findById(id).exec();
      if (!plano) {
        throw new NotFoundException(`Plano con id ${id} no encontrado`);
      }
      plano.archivoUrl = fileId;
      return plano.save();
    } catch (error) {
      console.error('Error al agregar archivo: ', error);
      throw error;
    }
  }
}
