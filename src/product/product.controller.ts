import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Headers } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/public/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Headers('access_token') acces_token : string) {
    await this.productService.check_token(acces_token);
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(@Headers('access_token') acces_token : string) {
    await this.productService.check_token(acces_token);
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Headers('access_token') acces_token : string) {
    await this.productService.check_token(acces_token);
    return this.productService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@Headers('access_token') acces_token : string) {
    await this.productService.check_token(acces_token);
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Headers('access_token') acces_token : string) {
    await this.productService.check_token(acces_token);
    return this.productService.remove(id);
  }
}
