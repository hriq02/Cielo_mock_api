import { Module } from '@nestjs/common';
import { RecurrentService } from './recurrent.service';
import { RecurrentController } from './recurrent.controller';
import { Product } from 'src/product/entities/product.entity';
import { Recurrent } from './entities/recurrent.entity';
import { Token } from 'src/token/entities/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    Product,
    Recurrent,
    Token
  ])],
  controllers: [RecurrentController],
  providers: [RecurrentService],
})
export class RecurrentModule {}
