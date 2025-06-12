import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import * as nodemailer from 'nodemailer';
import { TokenType } from './entities/token-action-enum';

@Injectable()
export class TokenControlService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Função para gerar um token de 6 dígitos
  private generateToken(): string {
    const token = Math.floor(100000 + Math.random() * 900000);
    return token.toString();
  }

  // Função para enviar e-mail com o token
  private async sendTokenEmail(
    email: string,
    token: string,
    tokenType: TokenType,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let xmlFilePath: string;
    let subject: string;

    if (tokenType === TokenType.FORGOT_PASSWORD) {
      xmlFilePath = 'src/resources/email-templates/forgot-password.xml';
      subject = 'Recuperação de Senha';
    } else {
      xmlFilePath = 'src/resources/email-templates/create-user.xml';
      subject = 'Criação de Usuário';
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: `Seu token de ${tokenType === TokenType.FORGOT_PASSWORD ? 'recuperação de senha' : 'criação de usuário'} é: ${token}`,
      attachments: [
        {
          filename: `${tokenType === TokenType.FORGOT_PASSWORD ? 'forgot-password' : 'create-user'}.xml`,
          path: xmlFilePath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
  }

  // Função para gerar o token de recuperação de senha ou criação de usuário
  async generateTokenForUser(
    influencerId: string,
    token_type: TokenType,
  ): Promise<any> {
    // Busca influencer pelo Supabase
    const influencer = await this.supabaseService.findOne(influencerId);
    if (!influencer) {
      throw new Error('Influencer não encontrado.');
    }

    const token = this.generateToken();
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    // Cria registro na tabela token_control via Supabase
    const { data, error } = await this.supabaseService['supabase']
      .from('token_control')
      .insert([
        {
          token,
          token_type,
          status: 'active',
          influencer_id: influencerId,
          expiresAt: expirationDate.toISOString(),
          payload: { email: influencer.email },
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error('Erro ao salvar token: ' + error.message);
    }

    await this.sendTokenEmail(influencer.email, token, token_type);

    return data;
  }

  // Função para validar o token
  async validateToken(token: string): Promise<any> {
    const { data, error } = await this.supabaseService['supabase']
      .from('token_control')
      .select('*')
      .eq('token', token)
      .eq('status', 'active')
      .single();

    if (error || !data) {
      throw new Error('Token inválido ou expirado');
    }

    if (new Date() > new Date(data.expiresAt)) {
      throw new Error('Token expirado');
    }

    return data;
  }

  // Função para marcar o token como usado
  async useToken(token: string): Promise<void> {
    const tokenControl = await this.validateToken(token);
    const { error } = await this.supabaseService['supabase']
      .from('token_control')
      .update({ status: 'used', usedAt: new Date().toISOString() })
      .eq('id', tokenControl.id);
    if (error) {
      throw new Error('Erro ao atualizar token: ' + error.message);
    }
  }
}
