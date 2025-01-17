import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plano } from 'src/schema/plano.schema';
import { CreatePlanoDto } from 'src/dto/create.plano.dto';
import { PlanoDto } from 'src/dto/plano.dto';
import { EtiquetaService } from './etiqueta.service';

@Injectable()
export class PlanoService {
  constructor(
    @InjectModel(Plano.name) private planoModel: Model<Plano>,
    private etiquetaService: EtiquetaService,
  ) {}

  private mapToDto(plano: Plano): PlanoDto {
    return {
      id: plano._id.toString(),
      archivoUrl: plano.archivoUrl,
      especialidad: plano.especialidad,
      tipoArchivo: plano.tipoArchivo,
      proyectoId: plano.proyectoId,
      etiquetas: plano.etiquetas.map((etiqueta) => ({
        id: etiqueta._id,
        archivoUrl: etiqueta.archivoUrl,
        nombre: etiqueta.nombre,
      })),
    };
  }

  async create(createPlanoDto: CreatePlanoDto): Promise<Plano> {
    const newPlano = new this.planoModel(createPlanoDto);
    return newPlano.save();
  }

  async addEtiquetaToPlano(
    planoId: string,
    etiquetaId: string,
  ): Promise<Plano> {
    return this.planoModel
      .findByIdAndUpdate(
        planoId,
        { $push: { etiquetas: etiquetaId } },
        { new: true },
      )
      .populate('etiquetas')
      .exec();
  }

  async findAll(): Promise<Plano[]> {
    return this.planoModel.find().exec();
  }

  async findOne(id: string): Promise<PlanoDto | null> {
    const plano = await this.planoModel
      .findById(id)
      .populate('etiquetas')
      .exec();
    return this.mapToDto(plano);
  }

  async removeAllByProyectoId(id: string) {
    const planos = await this.getPlanosByProyectoID(id);
    for (const plano of planos) {
      this.etiquetaService.removeAllByPlanoId(plano.id);
      this.remove(plano.id);
    }
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
