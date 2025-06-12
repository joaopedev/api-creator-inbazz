import {
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { TokenControlService } from './token-control.service';
import { CreateTokenControlDto } from './dto/create-token-control.dto';

@Controller('token-control')
export class TokenControlController {
  constructor(private readonly tokenControlService: TokenControlService) {}

  @Post()
  async create(@Body() dto: CreateTokenControlDto) {
    return this.tokenControlService.generateTokenForUser(
      dto.influencerId,
      dto.token_type,
    );
  }
}
