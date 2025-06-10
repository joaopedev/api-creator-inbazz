import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginWithEmailDto {
  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  @IsNotEmpty({ message: 'O campo e-mail é obrigatório.' })
  @IsString()
  email: string;
}
