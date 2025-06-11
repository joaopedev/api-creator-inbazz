import { Module } from '@nestjs/common';
import { TokenControlService } from './token-control.service';
import { TokenControlController } from './token-control.controller';

@Module({
  controllers: [TokenControlController],
  providers: [TokenControlService],
})
export class TokenControlModule {}
