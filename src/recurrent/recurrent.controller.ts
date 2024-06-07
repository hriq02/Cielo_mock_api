import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { RecurrentService } from './recurrent.service';
import { UpdateRecurrentDto } from './dto/update-recurrent.dto';

@Controller('api/public/v1/RecurrentPayment/')
export class RecurrentController {
  constructor(private readonly recurrentService: RecurrentService) {}
  
  @Get(':id')
  async findOne(@Param('id') id: string,@Headers('access_token') acces_token : string) {
    await this.recurrentService.check_token(acces_token);
    return this.recurrentService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRecurrentDto: UpdateRecurrentDto,@Headers('access_token') acces_token : string) {
    await this.recurrentService.check_token(acces_token);
    return this.recurrentService.update(id, updateRecurrentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Headers('access_token') acces_token : string) {
    await this.recurrentService.check_token(acces_token);
    return this.recurrentService.remove(id);
  }
}
