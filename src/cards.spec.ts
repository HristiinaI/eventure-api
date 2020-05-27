import { Test, TestingModule } from '@nestjs/testing';
import { Cards } from './cards';

describe('Cards', () => {
  let provider: Cards;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Cards],
    }).compile();

    provider = module.get<Cards>(Cards);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
