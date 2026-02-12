import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

/*

  follow API Requirements (Example)

  check if user role = admin
  - POST /products
  - PUT /products/:id
  - DELETE /products/:id
  - GET /admin/orders

  1.
  _ git push project "initial commit"
  _ entity, fix enum in user role 
  _ entity, added AllowNull for all not required column
  _ learn, learn and apply middleware or adguard in Doc

  2. make 2 entity work together
  _ order & order items
  _ product & category
  _ user & address
  _ ask if it valid or not with Antigravity

*/

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('name') name: string,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
    @Query('category') category: number
  ) {
    return this.productService.findAll(name, minPrice, maxPrice, category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
