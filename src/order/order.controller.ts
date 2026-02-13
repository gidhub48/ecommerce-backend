import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard, RoleGuard } from 'src/auth/authguard.service';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    // authenticated user create order
    return this.orderService.create(createOrderDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request) {
    // authenticated user get their orders
    // get user from request
    const user = request.user;
    return this.orderService.findAll(user.id);
  }

  @UseGuards(RoleGuard('Admin'))
  @Get('admin/orders')
  findAllAdmin() {
    // admin get all orders
    return this.orderService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    // authenticated user get order by id
    return this.orderService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
     // authenticated user update order
    return this.orderService.update(+id, updateOrderDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    // authenticated user delete order
    return this.orderService.remove(+id);
  }
}
