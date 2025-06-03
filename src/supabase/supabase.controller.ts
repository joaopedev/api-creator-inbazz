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

@Controller('supabase')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post()
  create(@Body() createUserSupabaseDTo: CreateUserDto) {
    return this.supabaseService.create(createUserSupabaseDTo);
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
