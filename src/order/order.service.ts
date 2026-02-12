import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order) private orderModel: typeof Order, 
    @InjectModel(OrderItem) private orderItem: typeof OrderItem
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create({...createOrderDto});
  }

  findAll() {
    return this.orderModel.findAll();
  }

  findOne(id: number) {
    return this.orderModel.findOne({where: {id}});
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.orderModel.update(updateOrderDto, {where: {id}});
    return this.orderModel.findOne({where: {id}})
  }

  remove(id: number) {
    return this.orderModel.destroy({where: {id}});
  }
}
