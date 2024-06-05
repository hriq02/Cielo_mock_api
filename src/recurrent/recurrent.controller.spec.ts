import { Test, TestingModule } from '@nestjs/testing';
import { RecurrentController } from './recurrent.controller';
import { RecurrentService } from './recurrent.service';

describe('RecurrentController', () => {
  let controller: RecurrentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecurrentController],
      providers: [RecurrentService],
    }).compile();

    controller = module.get<RecurrentController>(RecurrentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
