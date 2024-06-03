import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [ProductModule, OrdersModule, TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
