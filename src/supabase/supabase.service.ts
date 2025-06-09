import { Injectable } from '@nestjs/common';
import { UpdateSupabaseDto } from './dto/update-supabase.dto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user-supabase.dto';
import { CreateInfluencerDto } from './dto/create-influencer.dto';

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

  async create(createSupabaseDto: CreateUserDto & CreateInfluencerDto) {
    const {
      email,
      password,
      confirmEmail,
      confirmPassword,
      aboutYou,
      username,
      ig_id,
      tiktok,
      ...rest
    } = createSupabaseDto;

    const { data: signUpData, error: signUpError } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          ...rest,
          username,
          ig_id: ig_id || username,
          tiktok,
        },
      },
    });

    if (signUpError) throw new Error(signUpError.message);

    const userId = signUpData.user?.id;
    if (!userId) throw new Error('Falha ao obter ID do usuário após cadastro.');

    // Mapeamento correto para a tabela influencers
    const influencerInsertData: Partial<CreateInfluencerDto> = {
      id: userId,
      email,
      name: rest.name,
      last_name: rest.last_name,
      category: rest.category,
      followers: rest.followers,
      platform: rest.platform,
      doc: rest.doc,
      username,
      ig_id: ig_id || username,
      vindi_id: rest.vindi_id,
      profile_picture: rest.profile_picture,
      cep: rest.cep,
      address_number: rest.address_number,
      address_complement: rest.address_complement,
      ddd: rest.ddd,
      phone_number: rest.phone_number,
      address_street: rest.address_street,
      address_city: rest.address_city,
      address_state: rest.address_state,
      address_neighborhood: rest.address_neighborhood,
      gender: rest.gender,
      birthday: rest.birthday,
      content_images: rest.content_images,
      content_videos: rest.content_videos,
      description: aboutYou || rest.description,
      segments: rest.segments,
      agencia: rest.agencia,
      agencia_contato: rest.agencia_contato,
      agencia_email: rest.agencia_email,
      nickname: rest.nickname,
      ttk_access_token: rest.ttk_access_token,
      ttk_refresh_token: rest.ttk_refresh_token,
      ttk_refresh_exp: rest.ttk_refresh_exp,
      ttk_access_exp: rest.ttk_access_exp,
      ttk_followers: rest.ttk_followers,
      ttk_id: rest.ttk_id,
      ttk_user: rest.ttk_user,
      agenciado: rest.agenciado,
      status: rest.status,
      cadastrocompleto: rest.cadastrocompleto,
      convidadopor: rest.convidadopor,
      tem_login: rest.tem_login,
      engajamento: rest.engajamento,
      phyllo_ig_account: rest.phyllo_ig_account,
      phyllo_id: rest.phyllo_id,
      phyllo_ig_profile: rest.phyllo_ig_profile,
      additional_info: rest.additional_info,
      audience_countries: rest.audience_countries,
      audience_cities: rest.audience_cities,
      audience_genres: rest.audience_genres,
      expo_push_token: rest.expo_push_token,
      whitelabel_id: rest.whitelabel_id,
      creator_group: rest.creator_group,
      all_fb_pages: rest.all_fb_pages,
      fb_user_token: rest.fb_user_token,
      fb_page_token: rest.fb_page_token,
      fb_page_id: rest.fb_page_id,
      ig_business_account_id: rest.ig_business_account_id,
      confirmed_at: rest.confirmed_at,
      bio_instagram: rest.bio_instagram,
      exp_fb_user_token: rest.exp_fb_user_token,
      last_fb_opt_in: rest.last_fb_opt_in,
      deletedAt: rest.deletedAt,
      onesignal_id: rest.onesignal_id,
      fcm_token: rest.fcm_token,
      fcm_last_date: rest.fcm_last_date,
      entities_bio: rest.entities_bio,
      links_bio: rest.links_bio,
      ytb_channel_handle: rest.ytb_channel_handle,
      ytb_channel_id: rest.ytb_channel_id,
      ytb_last_refresh: rest.ytb_last_refresh,
      views_engajamento: rest.views_engajamento,
      media_count: rest.media_count,
      followers_cities: rest.followers_cities,
      followers_genres: rest.followers_genres,
      followers_ages: rest.followers_ages,
      engagement_cities: rest.engagement_cities,
      engagement_genres: rest.engagement_genres,
      engagement_ages: rest.engagement_ages,
      tier_followers: rest.tier_followers,
      country: rest.country,
      country_code: rest.country_code,
    };

    const { error: insertError } = await this.supabase
      .from('influencers')
      .insert([influencerInsertData]);

    if (insertError) throw new Error('Erro ao salvar influencer: ' + insertError.message);

    console.log("Influencer Cadastrado:",  )

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

  async findByInstaUser(cpf: string) {
    const { data, error } = await this.supabase
      .from('influencers')
      .select("*")
      .eq('username', cpf)

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
