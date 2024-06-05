import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Controller('api/public/v2/token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  create(@Body() TokenDto: CreateTokenDto) {
    return this.tokenService.create(TokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenService.remove(id);
  }
}

