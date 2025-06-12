import { Test, TestingModule } from '@nestjs/testing';
import { TokenControlController } from './token-control.controller';
import { TokenControlService } from './token-control.service';

describe('TokenControlController', () => {
  let controller: TokenControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenControlController],
      providers: [TokenControlService],
    }).compile();

    controller = module.get<TokenControlController>(TokenControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
