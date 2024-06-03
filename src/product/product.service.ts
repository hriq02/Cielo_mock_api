import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo : Repository<Product>
  ){}

  create(dto: CreateProductDto) {
    const product = this.repo.create(dto);
    //return 'This action adds a new product';
    return this.repo.save(product);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({id});
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.repo.findOneBy({id});
    if(!product) return null;
    this.repo.merge(product, updateProductDto);
    return this.repo.save(product);
  }

  async remove(id: string) {
    const product = await this.repo.findOneBy({id});
    if(!product) return null;
    this.repo.remove(product);
  }
}
