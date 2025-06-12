import { Test, TestingModule } from '@nestjs/testing';
import { TokenControlService } from './token-control.service';

describe('TokenControlService', () => {
  let service: TokenControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenControlService],
    }).compile();

    service = module.get<TokenControlService>(TokenControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
