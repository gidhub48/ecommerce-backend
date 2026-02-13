import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserModule } from './user.module';

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create({...createUserDto});
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  async findOneByColumn(column?: {}) {
    return this.userModel.findOne({where: column});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userModel.update(updateUserDto, { where: {id} });
    return this.findOne(id)
  }

  async remove(id: number) {
    return this.userModel.destroy({where: {id}});
  }
}
