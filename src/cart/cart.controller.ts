import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from 'src/auth/authguard.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() request, @Body() createCartDto: CreateCartDto) {
    // authenticated user create cart
    const user = request.user;
    return this.cartService.create(user.id, createCartDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this.cartService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(':itemId')
  update(@Param('itemId') itemId: string, @Body() updateCartDto: UpdateCartDto) {
    // authenticated user update cart item
    return this.cartService.updateItem(+itemId, updateCartDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
