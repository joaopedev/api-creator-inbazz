import {
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import { GenereType } from '../entities/genereEnum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsEmail()
  confirmEmail: string;

  @IsAlphanumeric()
  password: string;

  @IsAlphanumeric()
  confirmPassword: string;

  @IsOptional()
  @IsString()
  ttk_user?: string;

  @IsBoolean()
  agreeTerms: boolean;

  @IsString()
  doc: string;

  @IsString()
  ddd: string;

  @IsString()
  phone_number: string;

  @IsString()
  birthday: string;

  @IsString()
  gender: GenereType;

  @IsString()
  description: string;

  @IsString()
  address_state: string;

  @IsString()
  address_city: string;

  @IsString()
  cep: string;

  @IsString()
  address_neighborhood: string;

  @IsString()
  address_street: string;

  @IsString()
  address_number: string;

  @IsOptional()
  @IsString()
  address_complement?: string;
}
