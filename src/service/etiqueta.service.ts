import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EtiquetaDto } from 'src/dto/etiqueta.dto';
import { Etiqueta } from 'src/schema/etiqueta.schema';

@Injectable()
export class EtiquetaService {
  constructor(
    @InjectModel(Etiqueta.name) private etiquetaModel: Model<Etiqueta>,
  ) {}

  private mapToDto(etiqueta: Etiqueta): EtiquetaDto {
    return {
      id: etiqueta._id.toString(),
      archivoUrl: etiqueta.archivoUrl,
      nombre: etiqueta.nombre,
    };
  }

  async create(etiquetaDto: EtiquetaDto): Promise<Etiqueta> {
    const newEtiqueta = new this.etiquetaModel(etiquetaDto);
    return newEtiqueta.save();
  }

  async GetByPlanoId(planoId: string): Promise<EtiquetaDto[]> {
    const etiquetas = this.etiquetaModel.find({ planoId }).exec();
    return (await etiquetas).map((etiqueta) => this.mapToDto(etiqueta));
  }

  async removeAllByPlanoId(id: string) {
    const etiquetas = await this.GetByPlanoId(id);
    for (const etiqueta of etiquetas) {
      this.remove(etiqueta.id);
    }
  }

  async remove(id: string) {
    this.etiquetaModel.deleteOne({ _id: id }).exec();
  }
}
