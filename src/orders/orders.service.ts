import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/token/entities/token.entity';

import { Product } from 'src/product/entities/product.entity';
import { Recurrent } from 'src/recurrent/entities/recurrent.entity';
import { Repository } from 'typeorm';
import { customAlphabet, nanoid } from 'nanoid';
import { Shipping } from 'src/product/entities/shipping.entity';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Product)
    private readonly repo_product : Repository<Product>,
    @InjectRepository(Recurrent)
    private readonly repo_recurrent : Repository<Recurrent>,
    @InjectRepository(Shipping)
    private readonly repo_shipping : Repository<Shipping>,
    @InjectRepository(Token)
    private readonly token_repo : Repository<Token>
  ){}

  async getOrderNumber() {
    return "1db9226geg8b54e6b2972e9b745b89c7";
  }

  /**
   * takes the notification from the product
   * @param id 
   * @returns 
   */
  async GetCheckoutOrder(OrderNumber: string) {
    const [product,shipping,recurrent] : [Product,Shipping,Recurrent] = await this.GetItems(OrderNumber);
    const responses = []

    const link_gen = (max : number) => {
      const links = []
      Array.from({length : Math.floor(Math.random() * max) + 1}).forEach((_) =>{
        links.push({
          $id : Math.floor(Math.random() * 10) + 1,
          method : "Get",
          rel : "self",
          href : `http://localhost:8080/api/public/v2/orders/${OrderNumber}`
        });
      })
      return links;
    }
    Array.from({length : Math.floor(Math.random() * 3) + 1}).forEach(( _ , index) => {
      const links_generated = link_gen(3);
      responses.push({
        $id : index+ 1,
        checkoutOrderNumber : product.OrderNumber,
        createdDate : recurrent.startDate,
        links : links_generated
      });
    });
    return responses;
  }

  /**
   * get the transaction by checkoutOrder
   * @param OrderNumber 
   */
  async GetTransaction(OrderNumber: string) {
    const [product,shipping,recurrent] : [Product,Shipping,Recurrent] = await this.GetItems(OrderNumber);
    return {
      merchantId : "merchantID",
      orderNumber : product.OrderNumber,
      softDescriptor : product.softDescriptor,
      cart : {
        item : [{
          name : product.name,
          description : product.description,
          unitPrice : product.price,
          quantity : 1,
          type : product.type
        }]
      },
      shipping : {
        type : shipping.type,
        services : 
        [
          {
            name : shipping.name,
            price : shipping.price
          }
        ],
        address : {
          street : "Alameda Xingu",
          number : "512",
          complement : "21 andar",
          district : "Alphaville",
          city : "Barueri",
          state : "SP"
        },
      },
      payments : {
        status : recurrent.recurrentPaymentStatus,
        tid : nanoid(20),
        nsu : this.randomNumberFixedSize(6),
        authorizationCode : this.randomNumberFixedSize(6),
        numberOfPayments : 1,
        createdDate : recurrent.startDate,
        finishedDate : recurrent.endDate,
        carMaskedNuber : this.randomNumberFixedSize(6) + "******" + this.randomNumberFixedSize(4),
        brand : "Visa",
        type : "creditCard",
        errorcode : "00",
        antifraud : {
          antifraudeResult : 1,
          description : "Risco Baixo"
        }
      },
      customer : {
        identity : this.randomNumberFixedSize(10),
        fullName: "Nome do comprador", 
        email: "exemplo@email.com.br", 
        phone: "11" + this.randomNumberFixedSize(9)
      },
      links : [
        {
          method : "GET",
          rel : "self",
          href : `http://localhost:8080/api/public/v2/orders/${OrderNumber}`
        },
        {
          method : "POST",
          rel : "void",
          href : `http://localhost:8080/api/public/v2/orders/${OrderNumber}`
        }
      ]
    }
  }
  randomNumberFixedSize(size : number){
    let min : string = 1 + "";
    let max : string = 9 + "";
    Array.from({length : size}).forEach(() => {min += "0"; max += "0";});
    return Math.floor(Number(min) + Math.random() * Number(max))
  }

  /**
   * after the consumer server respond with 200  
   * @param OrderNumber 
   * @returns 
   */
  async return_response(OrderNumber: string, MerchantOrderNumber : string){
    const [product,shipping,recurrent] : [Product,Shipping,Recurrent] = await this.GetItems(OrderNumber);

    //response
    return {
      order_number: "1db9226geg8b54e6b2972e9b745b89c7", 
      amount: product.price, 
      discount_amount: 0, 
      checkout_cielo_order_number: "65930e7460bd4a849502ed14d7be6c03", 
      created_date: "10-03-2023 14:38:56", 
      customer_name: "costumer name", 
      customer_phone: "11987654321", 
      customer_identity: "445556667", 
      customer_email: "shopper@email.com.br", 
      shipping_type: 1, 
      shipping_name: "Motoboy", 
      shipping_price: shipping.price, 
      shipping_address_zipcode: shipping.originZipCode, 
      shipping_address_district: "Alphaville", 
      shipping_address_city: "Barueri", 
      shipping_address_state: "SP", 
      shipping_address_line1: "Alameda Xingu", 
      shipping_address_line2: "Apto 25", 
      shipping_address_number: "512", 
      payment_method_type: 1, 
      payment_method_brand: 1, 
      payment_maskedcreditcard: "482852******6856", 
      payment_installments: 1, 
      payment_status: recurrent.recurrentPaymentStatus, 
      tid: "10558590697J62OH9BPB", 
      test_transaction: "True",
      interval: recurrent.interval, 
      recurrent_status: recurrent.recurrentPaymentStatusDescription, 
      start_date: recurrent.startDate, 
      end_date: recurrent.endDate, 
      product_id: product.id, 
      product_type: product.type, 
      nsu: "038002", 
      authorization_code: "039186"
    };
  }

  private async GetItems(OrderNumber : string) : Promise<[Product, Shipping, Recurrent]> {
    const product_promise = this.repo_product.findOneBy({OrderNumber});
    const shipping_promise = product_promise.then(product => {
      if(!product) throw new BadRequestException("product not found");
      return this.repo_shipping.findOneBy({shipping_id : product.shipping_id});
    })
    const recurrent_promise = product_promise.then(product => {
      if(!product) throw new BadRequestException("product not found");
      return this.repo_recurrent.findOneBy({recurrent_id : product.recurrent_id});
    })
    return await Promise.all([product_promise, shipping_promise,recurrent_promise]);
  }

  /**
   * it checks the access token to see if exist or not
   * @param accessToken 
   */
  async check_token(accessToken : string) {
    if(await this.token_repo.findOneBy({acces_token : accessToken}) === null) 
      throw new UnauthorizedException('acces token invalid');
  }


}
/*

->pega prd
->pega recurrent pelo id
->pega shipping pelo id





*/