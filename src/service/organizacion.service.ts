import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Organizacion } from 'src/schema/organizacion.schema';
import { CreateOrganizacionDto } from 'src/dto/create.organizacion.dto';
import { OrganizacionDto } from 'src/dto/organizacion.dto';
import { CreateFormaDto } from 'src/dto/create.forma.dto';

@Injectable()
export class OrganizacionService {
  constructor(
    @InjectModel(Organizacion.name)
    private organizacionModel: Model<Organizacion>,
  ) {}

  private mapToDto(organizacion: Organizacion): OrganizacionDto {
    return {
      id: organizacion._id.toString(),
      nombre: organizacion.nombre,
      direccion: organizacion.direccion,
      datosContacto: organizacion.datosContacto,
      letra: organizacion.letra,
      numero: organizacion.numero,
      anio: organizacion.anio,
      partida: organizacion.partida,
      users: organizacion.users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
      })),
    };
  }

  async create(
    createOrganizacionDto: CreateOrganizacionDto,
  ): Promise<Organizacion> {
    const newOrganizacion = new this.organizacionModel(createOrganizacionDto);
    return newOrganizacion.save();
  }

  async findAll(): Promise<OrganizacionDto[]> {
    const organizaciones = await this.organizacionModel
      .find()
      .populate('users')
      .exec();
    return (await organizaciones).map((organizacion) =>
      this.mapToDto(organizacion),
    );
  }

  async findOne(id: string): Promise<OrganizacionDto | null> {
    const organizacion = await this.organizacionModel
      .findById(id)
      .populate('users')
      .exec();
    if (!organizacion) {
      throw new NotFoundException(`Organizacion con id ${id} no encontrada`);
    }
    return this.mapToDto(organizacion);
  }

  async remove(id: string): Promise<any> {
    return this.organizacionModel.deleteOne({ _id: id }).exec();
  }

  async addUserToOrganizacion(
    organizacionId: string,
    userId: string,
  ): Promise<Organizacion> {
    return await this.organizacionModel
      .findByIdAndUpdate(
        organizacionId,
        { $push: { users: userId } },
        { new: true },
      )
      .populate('users')
      .exec();
  }

  async update(
    id: string,
    organizacionDto: OrganizacionDto,
  ): Promise<Organizacion> {
    const organizacion = await this.organizacionModel.findById(id).exec();
    if (!organizacion) {
      throw new NotFoundException(`Organizacion con id ${id} no encontrada`);
    }
    if (organizacionDto.nombre) {
      organizacion.nombre = organizacionDto.nombre;
    }
    if (organizacionDto.direccion) {
      organizacion.direccion = organizacionDto.direccion;
    }
    if (organizacionDto.datosContacto) {
      organizacion.datosContacto = organizacionDto.datosContacto;
    }

    if (organizacionDto.letra) {
      organizacion.letra = organizacionDto.letra;
    }

    if (organizacionDto.anio) {
      organizacion.anio = organizacionDto.anio;
    }

    if (organizacionDto.numero) {
      organizacion.numero = organizacionDto.numero;
    }

    if (organizacionDto.partida) {
      organizacion.partida = organizacionDto.partida;
    }

    return organizacion.save();
  }
}
