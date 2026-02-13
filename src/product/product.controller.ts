import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RoleGuard } from 'src/auth/authguard.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(RoleGuard('Admin'))
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    // admin create product
    return this.productService.create(createProductDto);
  }

  // public get all products
  @Get()
  findAll(
    @Query('name') name: string,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
    @Query('category') category: number
  ) {
    // return all products with filters
    return this.productService.findAll(name, minPrice, maxPrice, category);
  }

  // public get categories
  @Get('categories') // Verify routing order, specific paths should be before :id
  findAllCategories() {
      // return all categories
      return this.productService.findAllCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(RoleGuard('Admin'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(RoleGuard('Admin'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
