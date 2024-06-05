import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Recurrent } from '../recurrent/entities/recurrent.entity';
import { Shipping } from './entities/shipping.entity';
import { Token } from 'src/token/entities/token.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Product,
    Recurrent,
    Shipping,
    Token
  ])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
