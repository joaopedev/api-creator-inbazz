import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { UpdateSupabaseDto } from './dto/update-supabase.dto';
import { CreateUserDto } from './dto/create-user-supabase.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateInfluencerDto } from './dto/create-influencer.dto';

@Controller('supabase')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post()
  create(@Body() createInfluencerDto: CreateUserDto & CreateInfluencerDto) {
    return this.supabaseService.create(createInfluencerDto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.supabaseService.loginUser(dto);
  }

  @Get()
  async findAll() {
    return await this.supabaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supabaseService.findOne(id);
  }

  @Get('email/:email')
  findEmail(@Param('email') email: string) {
    return this.supabaseService.findByEmail(email);
  }
  
  @Get('cpf/:cpf')
  findCPF(@Param('cpf') cpf: string) {
    return this.supabaseService.findByCPF(cpf);
  }

  @Get('instagram/:instagram')
  findByInstagram(@Param('instagram') instagram: string) {
    return this.supabaseService.findByInstaUser(instagram);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupabaseDto: UpdateSupabaseDto,
  ) {
    return this.supabaseService.update(id, updateSupabaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supabaseService.remove(+id);
  }
}
