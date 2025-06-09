import { Injectable } from '@nestjs/common';
import { UpdateSupabaseDto } from './dto/update-supabase.dto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user-supabase.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.ts';

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

    // if (email !== confirmEmail) throw new Error('Emails não coincidem.');
    // if (password !== confirmPassword) throw new Error('Senhas não coincidem.');

    const { data: signUpData, error: signUpError } =
      await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: metadata.name,
            username: metadata.username, // OK
            lastName: metadata.last_name, // ⚠️ antes estava metadata.lastName
            cpf: metadata.doc,
            instagram: metadata.username, // ou metadata.ig_id
            tiktok: metadata.ttk_user,
            phoneDDD: metadata.ddd,
            phoneNumber: metadata.phone_number,
            birthDate: metadata.birthday,
            gender: metadata.gender,
            state: metadata.address_state,
            city: metadata.address_city,
            cep: metadata.cep,
            neighborhood: metadata.address_neighborhood,
            street: metadata.address_street,
            number: metadata.address_number,
            complement: metadata.address_complement,
            aboutYou: metadata.description,
            agreeTerms: true,
          },
        },
      });

    if (signUpError) {
      throw new Error(signUpError.message);
    }

    const userId = signUpData.user?.id;

    if (!userId) {
      throw new Error('Falha ao obter ID do usuário após cadastro.');
    }

    const influencerInsertData = {
      id: userId,
      name: metadata.name,
      email,
      last_name: metadata.last_name, 
      username: metadata.username, 
      cep: metadata.cep,
      address_number: metadata.address_number,
      address_complement: metadata.address_complement,
      ddd: metadata.ddd,
      phone_number: metadata.phone_number,
      private: false,
      address_street: metadata.address_street,
      address_city: metadata.address_city,
      address_state: metadata.address_state,
      address_neighborhood: metadata.address_neighborhood,
      gender: metadata.gender,
      birthday: metadata.birthday,
    };

    const { error: insertError } = await this.supabase
      .from('influencers')
      .insert([influencerInsertData]);

    if (insertError) {
      throw new Error('Erro ao salvar influencer: ' + insertError.message);
    }

    console.log('Dados para inserir em influencers:', influencerInsertData);

    return {
      message: 'Usuário criado com sucesso',
      user: {
        id: userId,
        email,
      },
    };
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

  // async forgottPassword(email: ForgotPasswordDTO){
  //   const { data, erro } = await this.supabase.auth.resetPasswordForEmail(email)

  // }

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

  async findByEmail(email: string) {
    const { data, error } = await this.supabase
      .from('influencers')
      .select('*')
      .eq('email', email);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findByCPF(cpf: string) {
    const { data, error } = await this.supabase
      .from('influencers')
      .select('*')
      .eq('doc', cpf);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findByInstaUser(cpf: string) {
    const { data, error } = await this.supabase
      .from('influencers')
      .select('*')
      .eq('username', cpf);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async update(id: string, updateSupabaseDto: UpdateSupabaseDto) {
    return `This action updates a #${id} supabase`;
  }

  remove(id: number) {
    return `This action removes a #${id} supabase`;
  }
}
