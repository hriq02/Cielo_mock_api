import { HttpCode, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeepPartial, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecurrentDto } from './dto/recurrent-product.dto.subItem';
import { CreateShippingDto } from './dto/shippment-product.dto.subItem';
import { Shipping } from './entities/shipping.entity';
import { Recurrent } from './entities/recurrent.entity';
import { Response_api } from 'src/utils/response.gen';
import { Token } from 'src/token/entities/token.entity';

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

  async create(dto: CreateProductDto,acces_token : string) {

    if(this.token_repo.findOneBy({acces_token : acces_token}) == null) return this.invalid_acces();

    const product = this.repo_product.create(dto);
    const recurancy = this.repo_recurrent.create(dto.recurrent);
    const shipping = this.repo_shipping.create(dto.shipping);
    
    await this.repo_recurrent.save(recurancy);
    await this.repo_shipping.save(shipping);
    
    product.recurrent_id = recurancy.recurrent_id;
    product.shipping_id = shipping.shipping_id;
    
    await this.repo_product.save(product);
    return new Response_api(product, shipping, recurancy);
  }

  async findAll(acces_token : string) {
    
    if(this.token_repo.findOneBy({acces_token : acces_token}) == null) return this.invalid_acces();

    let responses : Response_api[] = [];
    const products = await this.repo_product.find();
    const recurrecies = await this.repo_recurrent.find();
    const shippings = await this.repo_shipping.find();

    for(let i = 0; i <= products.length-1; i++){
      responses.push(new Response_api(products[i], shippings[i], recurrecies[i]));
    }
    return responses;
  }

  async findOne(id: string, acces_token : string) {

    if(this.token_repo.findOneBy({acces_token : acces_token}) == null) return this.invalid_acces();

    const product = await this.repo_product.findOneBy({id});

    if(!product) return this.null_product();

    const recurrent_id = product.recurrent_id;
    const recurrent = await this.repo_recurrent.findOneBy({recurrent_id});

    const shipping_id = product.shipping_id;
    const shipping = await this.repo_shipping.findOneBy({shipping_id});

    return new Response_api(product, shipping, recurrent );
  }

  async update(id: string, updateProductDto: UpdateProductDto, acces_token : string) {
    const product = await this.repo_product.findOneBy({id});

    if(!product) return this.null_product();

    this.repo_product.merge(product, updateProductDto);
    return this.repo_product.save(product);
  }

  async remove(id: string, acces_token : string) {
    const product = await this.repo_product.findOneBy({id});

    if(!product) return this.null_product();

    this.repo_product.remove(product);
    return product;
  }

  @HttpCode(401)
  private invalid_acces(){
    return {
      error : "Invalid acces",
      message : "access_token invalid,created or expired"
    }
  }

  @HttpCode(400)
  private null_product(){
    return {
      error : "Product not found",
      message : "the id was not found"
    };
  }
}
