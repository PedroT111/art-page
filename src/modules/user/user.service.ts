import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/database/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(atributte: string, value: any): Promise<User | null> {
    return await this.userModel.findOne({ [atributte]: value });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
