import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Headers } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/public/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Headers('access_token') acces_token : string) {
    return this.productService.create(createProductDto,acces_token);
  }

  @Get()
  findAll(@Headers('access_token') acces_token : string) {
    return this.productService.findAll(acces_token);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('access_token') acces_token : string) {
    return this.productService.findOne(id,acces_token);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@Headers('access_token') acces_token : string) {
    return this.productService.update(id, updateProductDto,acces_token);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Headers('access_token') acces_token : string) {
    return this.productService.remove(id,acces_token);
  }
}
