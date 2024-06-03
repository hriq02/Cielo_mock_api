import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { TokenModule } from './token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : "sqlite",
      database : "db.sqlite",
      entities : [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize : true
    }),
    ProductModule, OrdersModule, TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
