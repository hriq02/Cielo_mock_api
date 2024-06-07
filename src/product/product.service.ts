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
  /**
   * create a new product
   * @param dto 
   * @returns 
   */
  async create(dto: CreateProductDto) {
    const product = this.repo_product.create(dto);
    const recurancy = this.repo_recurrent.create(dto.recurrent);
    const shipping = this.repo_shipping.create(dto.shipping);

    if(dto.recurrent){
      await this.repo_recurrent.save(recurancy)
      product.recurrent_id = recurancy.recurrent_id;
    }
    if(dto.shipping){
      await this.repo_shipping.save(shipping)
      product.shipping_id = shipping.shipping_id;
    }

    await this.repo_product.save(product);
  
    return this.product_response(product, shipping, recurancy);
  }

  /**
   * find all products in database
   * @returns 
   */
  async findAll() {
    const products = await this.repo_product.find();

    const responses = await Promise.all(products.map(async (product) =>{
      const shipping = await this.repo_shipping.findOneBy({shipping_id : product.shipping_id});
      const recurrent = await this.repo_recurrent.findOneBy({recurrent_id : product.recurrent_id});

      return await this.product_response(product, shipping, recurrent);
    }))
    return responses;
  }
  /**
   * find a product
   * @param id 
   * @returns 
   */
  async findOne(id: string) {
    const product = await this.repo_product.findOneBy({id});
    if(!product) throw new NotFoundException();

    const recurrent = await this.repo_recurrent.findOneBy({recurrent_id : product.recurrent_id});

    const shipping_id = product.shipping_id;
    const shipping = await this.repo_shipping.findOneBy({shipping_id});

    return this.product_response(product, shipping, recurrent );
  }
  /**
   * updates a product
   * @param id 
   * @param updateProductDto 
   * @returns 
   */
  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.repo_product.findOneBy({id});

    if(!product) throw new NotFoundException();

    this.repo_product.merge(product, updateProductDto);
    return this.repo_product.save(product);
  }
  /**
   * removes a product
   * @param id 
   * @returns 
   */
  async remove(id: string) {
    const product = await this.repo_product.findOneBy({id});
    if(!product) throw new NotFoundException();

    this.repo_product.remove(product);
    return product;
  }
  /**
   * it checks the access token to see if exist or not
   * @param accessToken 
   */
  async check_token(accessToken : string) {
    if(await this.token_repo.findOneBy({acces_token : accessToken}) === null) 
      throw new UnauthorizedException('acces token invalid');
  }
  /**
   * formats a response for the client
   * @param product 
   * @param _shipping 
   * @param _recurency 
   * @returns 
   */
  private product_response(product : Product, _shipping : Shipping, _recurency : Recurrent) {
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

      shipping : _shipping ? {
        type : _shipping.type,
        name : _shipping.name,
        price : _shipping.price
      } : {},

      recurrent : _recurency ?{
        interval : _recurency.interval,
        endDate : _recurency.endDate
      } : {},

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
