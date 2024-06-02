import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Recurrent } from './entities/Recurrent.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : 'sqlite',
      database : 'db.sqlite',
      entities : [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize : true,
      logging : true
    }),
    TypeOrmModule.forFeature([Product,Recurrent]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
