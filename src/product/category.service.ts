import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from './entities/category.entity';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';
import { Op } from 'sequelize';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category) 
    private categoryModel: typeof Category
  ) {}

  async create(createCartDto: CreateCartDto) {
    return this.categoryModel.create({...createCartDto});
  }

  async findAll(name?: string) {
    const where = {}
    if (name != undefined) {
        where['name'] = {[Op.like]: [`%${name}%`]}
    }
    return this.categoryModel.findAll({
      where,  
      attributes: {exclude: ['createdAt', 'updatedAt']}
    })
  }

  async findOne(id: number) {
    return this.categoryModel.findByPk(id, 
      {
        include: [{
          model: Category, 
          attributes: {exclude: ['createdAt', 'updatedAt']}
        }],
        attributes: {exclude: ['createdAt', 'updatedAt']}
      }
    );
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.categoryModel.update(updateProductDto, {
      where: {id}
    });
    return this.findOne(id)
  }

  async remove(id: number) {
    return this.categoryModel.destroy({where: {id}});
  }
}
