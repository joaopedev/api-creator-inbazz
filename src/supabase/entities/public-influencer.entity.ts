import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('influencers')
export class Influencers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'text' })
  followers: string;

  @Column({ type: 'bigint' })
  platform: number;

  @Column('text', { array: true })
  last_name: string[];

  @Column({ type: 'text' })
  doc: string;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  ig_id: string;

  @Column({ type: 'text' })
  vindi_id: string;

  @Column({ type: 'text' })
  profile_picture: string;

  @Column({ type: 'text' })
  cep: string;

  @Column({ type: 'text' })
  address_number: string;

  @Column({ type: 'text' })
  address_complement: string;

  @Column({ type: 'text' })
  ddd: string;

  @Column({ type: 'text' })
  phone_number: string;

  @Column({ type: 'boolean' })
  private: boolean;

  @Column({ type: 'text' })
  address_street: string;

  @Column({ type: 'text' })
  address_city: string;

  @Column({ type: 'text' })
  address_state: string;

  @Column({ type: 'text' })
  address_neighborhood: string;

  @Column({ type: 'text' })
  fb_access_token: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  fb_expiration: Date;

  @Column({ type: 'text' })
  ig_access_token: string;

  @Column({ type: 'text' })
  ig_user_id: string;

  @Column({ type: 'smallint' })
  avaliation: number;

  @Column({ type: 'text' })
  banner: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  birthday: string;

  @Column({ type: 'date' })
  content_images: string[];

  @Column({ type: 'text', array: true })
  content_videos: string[];

  @Column({ type: 'text' })
  gender: string;

  @Column('text', { array: true })
  segments: string[];

  @Column({ type: 'text' })
  agencia: string;

  @Column({ type: 'text' })
  agencia_contato: string;

  @Column({ type: 'text' })
  agencia_email: string;

  @Column({ type: 'text' })
  nickname: string;

  @Column({ type: 'text' })
  ttk_access_token: string;

  @Column({ type: 'text' })
  ttk_refresh_token: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  ttk_refresh_exp: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  ttk_access_exp: Date;

  @Column({ type: 'numeric' })
  ttk_followers: number;

  @Column({ type: 'text' })
  ttk_id: string;

  @Column({ type: 'text' })
  ttk_user: string;

  @Column({ type: 'text' })
  agenciado: string;

  @Column({ type: 'text' })
  status: string;

  @Column({ type: 'boolean' })
  cadastrocompleto: boolean;

  @Column({ type: 'uuid', nullable: true })
  convidadopor: string;

  @Column({ type: 'boolean' })
  tem_login: boolean;

  @Column({ type: 'numeric' })
  engajamento: number;

  @Column({ type: 'text' })
  phyllo_ig_account: string;

  @Column({ type: 'text' })
  phyllo_id: string;

  @Column({ type: 'text' })
  phyllo_ig_profile: string;

  @Column({ type: 'text' })
  additional_info: string;

  @Column('json', { nullable: true })
  audience_countries: any[];

  @Column('json', { nullable: true })
  audience_cities: any[];

  @Column('json', { nullable: true })
  audience_genres: any[];

  @Column({ type: 'text' })
  expo_push_token: string;

  @Column({ type: 'uuid' })
  whitelabel_id: string;

  @Column({ type: 'text' })
  creator_group: string;

  @Column('jsonb', { nullable: true })
  all_fb_pages: any[];

  @Column({ type: 'text' })
  fb_user_token: string;

  @Column({ type: 'text' })
  fb_page_token: string;

  @Column({ type: 'text' })
  fb_page_id: string;

  @Column({ type: 'text' })
  ig_business_account_id: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  confirmed_at: Date;

  @Column({ type: 'text' })
  bio_instagram: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  exp_fb_user_token: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  last_fb_opt_in: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date;

  @Column({ type: 'text' })
  onesignal_id: string;

  @Column({ type: 'text' })
  fcm_token: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  fcm_last_date: Date;

  @Column({ type: 'boolean' })
  fcm_status: boolean;

  @Column('text', { array: true })
  entities_bio: string[];

  @Column('text', { array: true })
  links_bio: string[];

  @Column({ type: 'text' })
  ytb_channel_handle: string;

  @Column({ type: 'text' })
  ytb_channel_id: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  ytb_last_refresh: Date;

  @Column({ type: 'bigint' })
  views_engajamento: number;

  @Column({ type: 'bigint' })
  media_count: number;

  @Column('jsonb', { nullable: true })
  followers_cities: any[];

  @Column('jsonb', { nullable: true })
  followers_genres: any[];

  @Column('jsonb', { nullable: true })
  followers_ages: any[];

  @Column('jsonb', { nullable: true })
  engagement_cities: any[];

  @Column('jsonb', { nullable: true })
  engagement_genres: any[];

  @Column('jsonb', { nullable: true })
  engagement_ages: any[];

  @Column({ type: 'text' })
  tier_followers: string;

  @Column({ type: 'text' })
  country: string;

  @Column({ type: 'text' })
  country_code: string;

  @Column({type: 'text'})
  token_controls
}
