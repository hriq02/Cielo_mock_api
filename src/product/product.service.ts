import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipping } from './entities/shipping.entity';

import { Token } from 'src/token/entities/token.entity';
import { Recurrent } from 'src/recurrent/entities/recurrent.entity';

@Injectable()
export class ProductService {
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

  async create(dto: CreateProductDto) {
    const product = this.repo_product.create(dto);
    const recurancy = this.repo_recurrent.create(dto.recurrent);
    const shipping = this.repo_shipping.create(dto.shipping);
    
    await this.repo_recurrent.save(recurancy);
    await this.repo_shipping.save(shipping);
    
    product.recurrent_id = recurancy.recurrent_id;
    product.shipping_id = shipping.shipping_id;
    
    await this.repo_product.save(product);
    return this.product_response(product, shipping, recurancy);
  }

  async findAll() {
    let responses = [];
    const products = await this.repo_product.find();
    const recurrecies = await this.repo_recurrent.find();
    const shippings = await this.repo_shipping.find();

    for(let i = 0; i <= products.length-1; i++){
      responses.push(this.product_response(products[i], shippings[i], recurrecies[i]));
    }
    return responses;
  }

  async findOne(id: string) {
    const product = await this.repo_product.findOneBy({id});

    if(!product) throw new NotFoundException();

    const recurrent_id = product.recurrent_id;
    const recurrent = await this.repo_recurrent.findOneBy({recurrent_id});

    const shipping_id = product.shipping_id;
    const shipping = await this.repo_shipping.findOneBy({shipping_id});

    return this.product_response(product, shipping, recurrent );
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.repo_product.findOneBy({id});

    if(!product) throw new NotFoundException();

    this.repo_product.merge(product, updateProductDto);
    return this.repo_product.save(product);
  }

  async remove(id: string) {
    const product = await this.repo_product.findOneBy({id});
    if(!product) throw new NotFoundException();

    this.repo_product.remove(product);
    return product;
  }

  async check_token(acces_token : string) {
    if(await this.token_repo.findOneBy({acces_token : acces_token}) === null) 
      throw new UnauthorizedException('acces token invalid');
  }

  private product_response(product : Product, shipping : Shipping, recurency : Recurrent) {
    return {
      id : product.id,
      shortUrl : `http://bit.ly/${product.short_url}`,
      OrderNumber : product.OrderNumber,
      type : product.type,
      name : product.name,
      description : product.description,
      showDescription : product.showDescription,
      price : product.price,
      weight : product.weight,
      
      shipping : {
          type : shipping.type,
          name : shipping.name,
          price : shipping.price
      },
      recurrent : {
          interval : recurency.interval,
          endDate : recurency.endDate
      },
      
      softDescriptor : product.softDescriptor,
      expirationDate : product.expirationDate,
      maxNumberOfInstallments : product.maxNumberOfInstallments,

      met_get : {
        method : "GET",
        rel : "self",
        href : `http://localhost:8080/Api/public/v1/product/${product.id}`
      },

      met_put : {
        method : "PUT",
        rel : "update",
        href : `http://localhost:8080/Api/public/v1/product/${product.id}`
      },

      met_del : {
        method : "DELETE",
        rel : "delete",
        href : `http://localhost:8080/Api/public/v1/product/${product.id}`
      },
    }
}


}
