import { Influencers } from 'src/supabase/entities/public-influencer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


// Definindo o Enum para os tipos de token
export enum TokenType {
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  CREATE_USER = 'CREATE_USER',
}

@Entity('token_control')
export class TokenControl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  // Tipo do token, usado para definir se é de recuperação de senha ou de criação de usuário
  @Column({
    type: 'enum',
    enum: TokenType,
  })
  token_type: TokenType;

  @Column({ default: 'active' })
  status: string;  // O status pode ser 'active', 'used', 'expired'

  // Relacionamento com a entidade influencer
  @ManyToOne(() => Influencers, (influencer) => influencer.token_controls)
  influencer: Influencers;

  // Data de criação do token
  @CreateDateColumn()
  createdAt: Date;

  // Data de expiração do token
  @Column({ nullable: true })
  expiresAt: Date;

  // Data em que o token foi usado ou invalidado
  @UpdateDateColumn()
  usedAt: Date;

  // Informações adicionais sobre a ação associada ao token
  @Column('jsonb', { nullable: true })
  payload: Record<string, any>;
}
