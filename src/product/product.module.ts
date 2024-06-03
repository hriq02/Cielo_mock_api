import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Recurrent } from './entities/recurrent.entity';
import { Shipping } from './entities/shipping.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Product,
    Recurrent,
    Shipping
  ])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
