import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { where } from 'sequelize';

@Injectable()
export class CartService {

  // ไปหาว่า :typeof Cart กับ :Cart ทำให้ต่างกันยังไง
  constructor(
    @InjectModel(Cart) private cartModel: typeof Cart,
    @InjectModel(CartItem) private cartItemModel: typeof CartItem
  ) {}

  create(userId: number, createCartDto: CreateCartDto) {
    return this.cartModel.create({...createCartDto, user_id: userId});
  }

  findAll() {
    return this.cartModel.findAll();
  }

  findOne(id: number) {
    return this.cartModel.findByPk(id);
  }

  updateItem(itemId: number, updateCartDto: UpdateCartDto) {
    return this.cartItemModel.update(updateCartDto, {where: {id: itemId}});
  }

  remove(id: number) {
    return this.cartModel.destroy({where: {id}});
  }
}
