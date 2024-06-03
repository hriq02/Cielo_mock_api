import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Recurrent_model } from './entities/recurrent.entity';
import { Shipping_model } from './entities/shipping.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Product,
    Recurrent_model,
    Shipping_model
  ])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
