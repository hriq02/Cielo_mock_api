import { Test, TestingModule } from '@nestjs/testing';
import { RecurrentService } from './recurrent.service';

describe('RecurrentService', () => {
  let service: RecurrentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecurrentService],
    }).compile();

    service = module.get<RecurrentService>(RecurrentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
