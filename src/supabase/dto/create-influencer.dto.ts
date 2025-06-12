import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
  IsUUID,
  IsDateString,
  IsObject,
} from 'class-validator';

export class CreateInfluencerDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsDateString()
  @IsOptional()
  created_at?: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  followers?: number;

  @IsArray()
  @IsOptional()
  platform?: string[];

  @IsString()
  last_name: string;

  @IsString()
  @IsOptional()
  doc?: string;

  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  ig_id?: string;

  @IsString()
  @IsOptional()
  vindi_id?: string;

  @IsString()
  @IsOptional()
  profile_picture?: string;

  @IsString()
  cep: string;

  @IsString()
  address_number: string;

  @IsString()
  address_complement: string;

  @IsString()
  ddd: string;

  @IsString()
  phone_number: string;

  @IsBoolean()
  @IsOptional()
  private?: boolean;

  @IsString()
  address_street: string;

  @IsString()
  address_city: string;

  @IsString()
  address_state: string;

  @IsString()
  address_neighborhood: string;

  @IsString()
  gender: string;

  @IsDateString()
  birthday: string;

  @IsArray()
  @IsOptional()
  content_images?: string[];

  @IsArray()
  @IsOptional()
  content_videos?: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  segments?: string[];

  @IsString()
  @IsOptional()
  agencia?: string;

  @IsString()
  @IsOptional()
  agencia_contato?: string;

  @IsString()
  @IsOptional()
  agencia_email?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  ttk_access_token?: string;

  @IsString()
  @IsOptional()
  ttk_refresh_token?: string;

  @IsDateString()
  @IsOptional()
  ttk_refresh_exp?: string;

  @IsDateString()
  @IsOptional()
  ttk_access_exp?: string;

  @IsNumber()
  @IsOptional()
  ttk_followers?: number;

  @IsString()
  @IsOptional()
  ttk_id?: string;

  @IsString()
  @IsOptional()
  ttk_user?: string;

  @IsString()
  @IsOptional()
  agenciado?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  cadastrocompleto?: boolean;

  @IsUUID()
  @IsOptional()
  convidadopor?: string;

  @IsBoolean()
  @IsOptional()
  tem_login?: boolean;

  @IsNumber()
  @IsOptional()
  engajamento?: number;

  @IsString()
  @IsOptional()
  phyllo_ig_account?: string;

  @IsString()
  @IsOptional()
  phyllo_id?: string;

  @IsString()
  @IsOptional()
  phyllo_ig_profile?: string;

  @IsObject()
  @IsOptional()
  additional_info?: any;

  @IsArray()
  @IsOptional()
  audience_countries?: any[];

  @IsArray()
  @IsOptional()
  audience_cities?: any[];

  @IsArray()
  @IsOptional()
  audience_genres?: any[];

  @IsString()
  @IsOptional()
  expo_push_token?: string;

  @IsUUID()
  @IsOptional()
  whitelabel_id?: string;

  @IsString()
  @IsOptional()
  creator_group?: string;

  @IsObject()
  @IsOptional()
  all_fb_pages?: any;

  @IsString()
  @IsOptional()
  fb_user_token?: string;

  @IsString()
  @IsOptional()
  fb_page_token?: string;

  @IsString()
  @IsOptional()
  fb_page_id?: string;

  @IsString()
  @IsOptional()
  ig_business_account_id?: string;

  @IsDateString()
  @IsOptional()
  confirmed_at?: string;

  @IsString()
  @IsOptional()
  bio_instagram?: string;

  @IsDateString()
  @IsOptional()
  exp_fb_user_token?: string;

  @IsDateString()
  @IsOptional()
  last_fb_opt_in?: string;

  @IsDateString()
  @IsOptional()
  deletedAt?: string;

  @IsString()
  @IsOptional()
  onesignal_id?: string;

  @IsString()
  @IsOptional()
  fcm_token?: string;

  @IsDateString()
  @IsOptional()
  fcm_last_date?: string;

  @IsBoolean()
  @IsOptional()
  fcm_status?: boolean;

  @IsArray()
  @IsOptional()
  entities_bio?: string[];

  @IsArray()
  @IsOptional()
  links_bio?: string[];

  @IsString()
  @IsOptional()
  ytb_channel_handle?: string;

  @IsString()
  @IsOptional()
  ytb_channel_id?: string;

  @IsDateString()
  @IsOptional()
  ytb_last_refresh?: string;

  @IsNumber()
  @IsOptional()
  views_engajamento?: number;

  @IsNumber()
  @IsOptional()
  media_count?: number;

  @IsArray()
  @IsOptional()
  followers_cities?: any[];

  @IsArray()
  @IsOptional()
  followers_genres?: any[];

  @IsArray()
  @IsOptional()
  followers_ages?: any[];

  @IsArray()
  @IsOptional()
  engagement_cities?: any[];

  @IsArray()
  @IsOptional()
  engagement_genres?: any[];

  @IsArray()
  @IsOptional()
  engagement_ages?: any[];

  @IsString()
  @IsOptional()
  tier_followers?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  country_code?: string;
}
