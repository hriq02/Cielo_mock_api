import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipping } from 'src/product/entities/shipping.entity';
import { Product } from 'src/product/entities/product.entity';
import { Recurrent } from 'src/recurrent/entities/recurrent.entity';
import { Token } from 'src/token/entities/token.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Shipping,
    Product,
    Recurrent,
    Token
  ])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
