import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/schema/user.schema';
import { ValidationService } from './validation.service';

@Injectable()
export class userService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private mapToDto(user: User & { organizacionId: any }): UserDto {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      picture: user.email,
      organizacionId: user.organizacionId?.id,
      organizacionName: user.organizacionId?.nombre ?? 'Sin organizacion',
    };
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }

  async findAll(): Promise<UserDto[]> {
    const users = this.userModel
      .find()
      .populate('organizacionId', 'nombre')
      .exec();
    return (await users).map((user) => this.mapToDto(user));
  }

  async findByAuth0Id(id: string): Promise<UserDto | null> {
    const user = await this.userModel
      .findOne({ id })
      .populate('organizacionId', 'nombre')
      .exec();
    if (user) {
      return this.mapToDto(user);
    } else {
      return null;
    }
  }

  async findOne(id: string): Promise<UserDto | null> {
    const user = await this.userModel
      .findById(id)
      .populate('organizacionId', 'nombre')
      .exec();
    return this.mapToDto(user);
  }

  async updateUserOrganizacion(
    userId: string,
    organizacionId: string,
  ): Promise<void> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { organizacionId }, // Asigna el organizacionId al usuario
      { new: true },
    );

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async removeUserFromOrg(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User con id ${userId} no encontrado`);
    }
    user.organizacionId = null;
    return user.save();
  }
}
