import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Organizacion } from 'src/schema/organizacion.schema';
import { CreateOrganizacionDto } from 'src/dto/create.organizacion.dto';

@Injectable()
export class OrganizacionService {
  constructor(
    @InjectModel(Organizacion.name)
    private organizacionModel: Model<Organizacion>,
  ) {}

  async create(
    createOrganizacionDto: CreateOrganizacionDto,
  ): Promise<Organizacion> {
    const newOrganizacion = new this.organizacionModel(createOrganizacionDto);
    return newOrganizacion.save();
  }

  async findAll(): Promise<Organizacion[]> {
    return this.organizacionModel.find().exec();
  }

  async findOne(id: string): Promise<Organizacion | null> {
    return this.organizacionModel.findById(id).exec();
  }

  async remove(id: string): Promise<any> {
    return this.organizacionModel.deleteOne({ _id: id }).exec();
  }
}
