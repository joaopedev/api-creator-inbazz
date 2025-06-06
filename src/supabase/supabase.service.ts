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

    console.log(email, confirmEmail)
    // if (email !== confirmEmail) throw new Error('Emails não coincidem.');
    // if (password !== confirmPassword) throw new Error('Senhas não coincidem.');

    const { data: signUpData, error: signUpError } =
      await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: metadata.name,
            username: metadata.username,
            lastName: metadata.lastName,
            cpf: metadata.cpf,
            instagram: metadata.instagram,
            tiktok: metadata.tiktok,
            phoneDDD: metadata.phoneDDD,
            phoneNumber: metadata.phoneNumber,
            birthDate: metadata.birthDate,
            gender: metadata.gender,
            state: metadata.state,
            city: metadata.city,
            cep: metadata.cep,
            neighborhood: metadata.neighborhood,
            street: metadata.street,
            number: metadata.number,
            complement: metadata.complement,
            agreeTerms: metadata.agreeTerms,
            aboutYou: metadata.aboutYou,
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
      last_name: metadata.lastName,
      username: metadata.instagram,
      cep: metadata.cep,
      address_number: metadata.number,
      address_complement: metadata.complement,
      ddd: metadata.phoneDDD,
      phone_number: metadata.phoneNumber,
      private: false,
      address_street: metadata.street,
      address_city: metadata.city,
      address_state: metadata.state,
      address_neighborhood: metadata.neighborhood,
      gender: metadata.gender,
      birthday: metadata.birthDate,
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
      .select("*")
      .eq('email', email)

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findByCPF(cpf: string) {
    const { data, error } = await this.supabase
      .from('influencers')
      .select("*")
      .eq('doc', cpf)

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
