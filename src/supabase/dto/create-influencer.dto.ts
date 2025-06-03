import { IsEmail, IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateInfluencerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  last_name: string;

  @IsString()
  username: string;

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

  @IsString()
  birthday: string; 

  @IsString()
  instagram_id?: string; // ig_id na table influencers

  @IsString()
  profile_picture?: string;

}