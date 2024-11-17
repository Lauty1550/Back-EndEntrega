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
      nombre: organizacion.nombre,
      direccion: organizacion.direccion,
      datosContacto: organizacion.datosContacto,
      //  forma: this.mapFormaToDto(organizacion.forma)
      forma: organizacion.forma,
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
}
