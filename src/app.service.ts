import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';
import { generate_id, generate_url } from './utils/generators';
import { Recurrent } from './entities/Recurrent.entity';


@Injectable()
export class AppService {
  constructor(
    @InjectDataSource()
    private readonly dataSource : DataSource
  ){}

  async seed(){
    await this.dataSource.transaction(async (db) => {
      const new_product = db.create(Product,{
        id : generate_id(),
        order_number : "123456",
        name : "Pedido",
        type : "Digital",
        description : "teste description",
        price : 100000,
        weight : 10000,
        expiration_date : "2027-06-19 16:30:00",
        soft_descriptor : "teste",
        max_number_of_Installments : 3,
        quantity : 3,
        sku : "teste",
        origin_zip_code : "123bewo2m",
        shipping_type : "whithoutShipping",
        shipping_name : "teste",
        shipping_price : 100000,
        show_description : true,
        short_url : generate_url(),
      })

      db.save(new_product);

      const recurrent = db.create(Recurrent,{
        id : new_product.id,
        interval : "Monthly",
        end_date : "2025-02-06",
        amount : new_product.price/4,
        day : 31,
        next_payment_date : "2024-06-06"
      })

      db.save(recurrent);
    })
  }

  // getHello(): string {
  //   return 'Hello World!';
  // }
}
