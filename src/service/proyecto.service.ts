import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Proyecto } from 'src/schema/proyecto.schema';
import { CreateProyectoDto } from 'src/dto/create.proyecto.dto';
import { ProyectoDto } from 'src/dto/proyectoDto';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectModel(Proyecto.name) private proyectoModel: Model<Proyecto>,
  ) {}

  private mapToDto(proyecto: Proyecto): ProyectoDto {
    return {
      id: proyecto._id.toString(),
      nombreProyecto: proyecto.nombreProyecto,
      expediente: proyecto.expediente,
      obra: proyecto.obra,
      destino: proyecto.destino,
      ubicacion: proyecto.ubicacion,
      escala: proyecto.escala,
      antecedente: proyecto.antecedente,
      aprobacion: proyecto.aprobacion,
      userId: proyecto.userId,
      planos: proyecto.planos.map((plano) => ({
        id: plano._id,
        especialidad: plano.especialidad,
        etiquetas: plano.etiquetas,
        archivoUrl: plano.archivoUrl,
        // proyectoId: plano.proyectoId,
      })),
    };
  }

  async create(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    const newProyecto = new this.proyectoModel(createProyectoDto);
    return newProyecto.save();
  }

  async addPlanoToProyecto(
    proyectoId: string,
    planoId: string,
  ): Promise<Proyecto> {
    return this.proyectoModel
      .findByIdAndUpdate(
        proyectoId,
        { $push: { planos: planoId } },
        { new: true },
      )
      .populate('planos')
      .exec();
  }

  async findAll(): Promise<ProyectoDto[]> {
    const proyectos = this.proyectoModel.find().populate('planos').exec();
    return (await proyectos).map((proyecto) => this.mapToDto(proyecto));
    // return this.proyectoModel.find().exec();
  }

  async getProyectoByUserId(userId: string): Promise<ProyectoDto[]> {
    const proyectos = this.proyectoModel
      .find({ userId })
      .populate('planos')
      .exec();
    return (await proyectos).map((proyecto) => this.mapToDto(proyecto));
  }

  async findOne(id: string): Promise<ProyectoDto | null> {
    const proyecto = await this.proyectoModel
      .findById(id)
      .populate('planos')
      .exec();
    return this.mapToDto(proyecto);
  }

  async remove(id: string): Promise<any> {
    return this.proyectoModel.deleteOne({ _id: id }).exec();
  }

  async update(
    id: string,
    createProyectoDto: CreateProyectoDto,
  ): Promise<Proyecto> {
    const proyecto = await this.proyectoModel.findById(id).exec();

    if (!proyecto) {
      throw new NotFoundException(`Proyecto con id ${id} no encontrado`);
    }

    if (createProyectoDto.nombreProyecto) {
      proyecto.nombreProyecto = createProyectoDto.nombreProyecto;
    }
    if (createProyectoDto.ubicacion) {
      proyecto.ubicacion = createProyectoDto.ubicacion;
    }
    if (createProyectoDto.antecedente) {
      proyecto.antecedente = createProyectoDto.antecedente;
    }
    if (createProyectoDto.escala) {
      proyecto.escala = createProyectoDto.escala;
    }
    if (createProyectoDto.obra) {
      proyecto.obra = createProyectoDto.obra;
    }
    if (createProyectoDto.destino) {
      proyecto.destino = createProyectoDto.destino;
    }

    return proyecto.save();
  }
}
