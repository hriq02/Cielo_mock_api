import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('api/public/v2/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('merchant_order/:order_number')
  async findOne(@Param('order_number') order_number: string,@Headers('access_token') acces_token : string) {
    //if(isUUID(id)) return this.ordersService.getNotfication(id);
    await this.ordersService.check_token(acces_token);
    return this.ordersService.GetCheckoutOrder(order_number);
  }
  @Get(':checkoutOrder')
  async findOrder(@Param('checkoutOrder') id: string,@Headers('access_token') acces_token : string){
    await this.ordersService.check_token(acces_token);
    return this.ordersService.GetTransaction(id);
  }
}
