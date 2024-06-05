import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { RecurrentService } from './recurrent.service';
import { CreateRecurrentDto } from './dto/create-recurrent.dto';
import { UpdateRecurrentDto } from './dto/update-recurrent.dto';

@Controller('api/public/v1/RecurrentPayment/')
export class RecurrentController {
  constructor(private readonly recurrentService: RecurrentService) {}
  
  @Get(':id')
  findOne(@Param('id') id: string,@Headers('access_token') acces_token : string) {
    return this.recurrentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecurrentDto: UpdateRecurrentDto,@Headers('access_token') acces_token : string) {
    return this.recurrentService.update(+id, updateRecurrentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Headers('access_token') acces_token : string) {
    return this.recurrentService.remove(+id);
  }
}
