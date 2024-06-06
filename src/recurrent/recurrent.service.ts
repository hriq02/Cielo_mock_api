import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateRecurrentDto } from './dto/update-recurrent.dto';
import { CreateRecurrentDto } from './dto/create-recurrent.dto';
import { Product } from 'src/product/entities/product.entity';
import { Recurrent } from './entities/recurrent.entity';
import { Token } from 'src/token/entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { format_currency, format_date } from 'src/util/data_transform.utils';

@Injectable()
export class RecurrentService {
  constructor(
    @InjectRepository(Product)
    private readonly repo_product : Repository<Product>,
    @InjectRepository(Recurrent)
    private readonly repo_recurrent : Repository<Recurrent>,
    @InjectRepository(Token)
    private readonly token_repo : Repository<Token>
  ){}

  async findOne(id: string) {
    const product = await this.repo_product.findOneBy({id});
    if(!product) throw new NotFoundException("product not found");

    const recurrent = await this.repo_recurrent.findOneBy({recurrent_id : product.recurrent_id});
    if(!recurrent) throw new NotFoundException("recurrency not found");

    return this.recurrency_response(product, recurrent);
  }

  async update(id: string, updateRecurrentDto: UpdateRecurrentDto) {
    const recurrent = await this.GetRecurrency(id);
    await this.repo_recurrent.merge(recurrent, updateRecurrentDto);

    return {"message" : `Recurrent Payment - ${id} Updated Successfully`};
  }

  async remove(id: string) {
    const recurrent = await this.GetRecurrency(id);

    return await this.repo_recurrent.remove(recurrent);
  }

  async GetRecurrency(id : string): Promise<Recurrent> {
    const productPromise = this.repo_product.findOneBy({id});
    const recurrentPromise = productPromise.then(product => {
      if(!product) throw new NotFoundException("product not found");
      return this.repo_recurrent.findOneBy({recurrent_id : product.recurrent_id});
    })
    const [product, recurrent] = await Promise.all([productPromise, recurrentPromise]);

    if(!recurrent) throw new NotFoundException("recurrency not found");

    return recurrent;
  }

  async check_token(acces_token : string) {
    if(await this.token_repo.findOneBy({acces_token : acces_token}) === null) 
      throw new UnauthorizedException('acces token invalid');
  }
  
  private recurrency_response(product : Product, recurrent : Recurrent) {
    return {
      $id : "1",
      id : recurrent.recurrent_id,
      pagadorRecurrentPaymentId : product.id,
      recurrentPaymentStatus : recurrent.recurrentPaymentStatus,
      recurrentPaymentStatusEnum : recurrent.recurrentPaymentStatus,
      isRecurrentPaymentExpired : recurrent.isRecurrentPaymentExpired,
      allowEdit : recurrent.allowEdit,
      startDate : recurrent.startDate,
      endDate : recurrent.endDate,
      formatedEndDate : format_date(recurrent.endDate),
      day : recurrent.day,

      items : {
        $id : "2",
        name : "nome do item",
        quantity : 1,
        unitPrice : 1000,
        totalPrice : 1000,
        formattedUnitPrice : format_currency(1000, "BRL"),
        formattedTotalPrice : format_currency(1000, "BRL")
      },
      history :{
        $id : "2",
        orderId : "",
        orderNumber : "",
        merchantOrderNumber : "",
        createdDate : "",
        paymentStatus : "",
        paymentStatusDescription : ""
      },
      lastPaymentDate : recurrent.lastPaymentDate,
      nextPaymentDate : recurrent.nextPaymentDate,
      formatedNextPaymentDate : format_date(recurrent.nextPaymentDate),
      intervalDescription : recurrent.interval,
      recurrentPaymentStatusDescription : recurrent.recurrentPaymentStatus,
      ammout : recurrent.Amount
    }
  }
}
