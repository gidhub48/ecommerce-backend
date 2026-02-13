import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Op } from 'sequelize';
import { Category } from './entities/category.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product) 
    private productModel: typeof Product,
    @InjectModel(Category)
    private categoryModel: typeof Category
  ) {}

  async create(createProductDto: CreateProductDto) {
    return this.productModel.create({...createProductDto});
  }

  async findAll(name?: string, minPrice?: number, maxPrice?: number, category?: number) {
    let where = {}

    if (name) {
      where['name'] = {[Op.like]: [`%${name}%`]}
    }
    if (category !== undefined) {
      where['category_id'] = category
    }
    if (maxPrice !== undefined && minPrice !== undefined) {
      if (Number(maxPrice) < Number(minPrice)) {
        throw new Error("error max price is more than min price")
      }
      where['price'] = {[Op.between]: [minPrice, maxPrice]}
    }
    if (maxPrice && !minPrice) {
      where['price'] = {[Op.lt]: [maxPrice]}
    }
    if (minPrice && !maxPrice) {
      where['price'] = {[Op.gt]: [minPrice]}
    }
    
    return this.productModel.findAll({
      where, 
      include: [{model: Category, attributes: {exclude: ['createdAt', 'updatedAt']}}], 
      attributes: {exclude: ['createdAt', 'updatedAt']}
    })
  }

  async findAllCategories() {
    return this.categoryModel.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']}
    });
  }

  async findOne(id: number) {
    return this.productModel.findByPk(id, 
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
    await this.productModel.update(updateProductDto, {
      where: {id}
    });
    return this.findOne(id)
  }

  async remove(id: number) {
    return this.productModel.destroy({where: {id}});
  }
}
