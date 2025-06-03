import { Injectable } from '@nestjs/common';
import { UpdateSupabaseDto } from './dto/update-supabase.dto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user-supabase.dto';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');
    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Supabase URL or Key is not defined in environment variables',
      );
    }
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async create(createSupabaseDto: CreateUserDto) {
    const { email, password, confirmEmail, confirmPassword, ...metadata } =
      createSupabaseDto;

    if (email !== confirmEmail) throw new Error('Emails não coincidem.');
    if (password !== confirmPassword) throw new Error('Senhas não coincidem.');

    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async loginUser(dto: LoginUserDto) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findAll() {
    const { data, error } = await this.supabase.from('influencers').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('influencers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  update(id: string, updateSupabaseDto: UpdateSupabaseDto) {
    return `This action updates a #${id} supabase`;
  }

  remove(id: number) {
    return `This action removes a #${id} supabase`;
  }
}
