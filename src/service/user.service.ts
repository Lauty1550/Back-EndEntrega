import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/schema/user.schema';

@Injectable()
export class userService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private mapToDto(user: User): UserDto {
    return {
      name: user.name,
      email: user.email,
      picture: user.email,
    };
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }

  async findAll(): Promise<UserDto[]> {
    const users = this.userModel.find().exec();
    return (await users).map((user) => this.mapToDto(user));
  }

  async findByAuth0Id(id: string): Promise<UserDto | null> {
    const user = await this.userModel.findOne({ id }).exec();
    if (user) {
      return this.mapToDto(user);
    } else {
      return null;
    }
  }
}
