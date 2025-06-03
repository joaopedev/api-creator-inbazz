import { IsAlphanumeric, IsBoolean, IsEmail, IsString } from 'class-validator';
import { GenereType } from '../entities/genereEnum';

export class CreateUserDto {
  @IsString()
  name: string;

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

  @IsString()
  instagram: string;

  @IsString()
  tiktok?: string;

  @IsBoolean()
  agreeTerms: boolean;

  @IsString()
  cpf: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneDDD: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  birthDate: string;

  @IsString()
  gender: GenereType;

  @IsString()
  aboutYou: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  cep: string;

  @IsString()
  neighborhood: string;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  complement: string;
}
