import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

@Injectable()
export class TokenService {

  constructor(
    @InjectRepository(Token)
    public readonly token_repo : Repository<Token>
  ){}
  async create(createTokenDto: CreateTokenDto) {
    const accessToken = nanoid(480);

    const token = {
      acces_token : accessToken
    };

    await this.token_repo.create(token);

    const response ={
      access_token : accessToken,
      token_type : "bearer",
      expires_in : 1199
    }

    return response;
  }

  // findAll() {
  //   return `This action returns all token`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} token`;
  // }

  // update(id: string, updateTokenDto: UpdateTokenDto) {
  //   return `This action updates a #${id} token`;
  // }

  async remove(id: string) {
    const token = await this.token_repo.findOneBy({acces_token : id});
    if(!token) return null;
    return this.token_repo.remove(token);
  }
}
