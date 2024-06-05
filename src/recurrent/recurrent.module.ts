import { Module } from '@nestjs/common';
import { RecurrentService } from './recurrent.service';
import { RecurrentController } from './recurrent.controller';

@Module({
  controllers: [RecurrentController],
  providers: [RecurrentService],
})
export class RecurrentModule {}
