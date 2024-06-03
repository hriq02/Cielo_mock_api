import { Injectable } from '@nestjs/common';
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

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo_product : Repository<Product>,
    @InjectRepository(Recurrent)
    private readonly repo_recurrent : Repository<Recurrent>,
    @InjectRepository(Shipping)
    private readonly repo_shipping : Repository<Shipping>
  ){}

  async create(dto: CreateProductDto) {
    const product = this.repo_product.create(dto);
    const recurancy = this.repo_recurrent.create(dto.recurrent);
    const shipping = this.repo_shipping.create(dto.shipping);
    
    await this.repo_recurrent.save(recurancy);
    await this.repo_shipping.save(shipping);
    
    product.recurrent = recurancy;
    product.shipping = shipping;
    
    await this.repo_product.save(product);
    return new Response_api(product, shipping, recurancy);
  }

  findAll() {
    return this.repo_product.find();
  }

  findOne(id: string) {
    return this.repo_product.findOneBy({id});
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.repo_product.findOneBy({id});
    if(!product) return null;
    this.repo_product.merge(product, updateProductDto);
    return this.repo_product.save(product);
  }

  async remove(id: string) {
    const product = await this.repo_product.findOneBy({id});
    if(!product) return null;
    this.repo_product.remove(product);
    return product;
  }
}
