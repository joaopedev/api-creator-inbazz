import { IsEnum, IsUUID } from 'class-validator';
import { TokenType } from '../entities/token-action-enum';

export class CreateTokenControlDto {
  @IsUUID()
  influencerId: string;

  @IsEnum(TokenType)
  token_type: TokenType;
}
