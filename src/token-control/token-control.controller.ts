import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenControlService } from './token-control.service';
import { CreateTokenControlDto } from './dto/create-token-control.dto';
import { UpdateTokenControlDto } from './dto/update-token-control.dto';

@Controller('token-control')
export class TokenControlController {
  constructor(private readonly tokenControlService: TokenControlService) {}

  @Post()
  create(@Body() createTokenControlDto: CreateTokenControlDto) {
    return this.tokenControlService.create(createTokenControlDto);
  }

  @Get()
  findAll() {
    return this.tokenControlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenControlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenControlDto: UpdateTokenControlDto) {
    return this.tokenControlService.update(+id, updateTokenControlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenControlService.remove(+id);
  }
}
