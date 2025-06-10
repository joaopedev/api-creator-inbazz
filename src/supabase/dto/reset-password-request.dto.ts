import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsNotEmpty({ message: 'O token de acesso é obrigatório.' })
  @IsString()
  accessToken: string;

  @IsNotEmpty({ message: 'A nova senha é obrigatória.' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  newPassword: string;
}
