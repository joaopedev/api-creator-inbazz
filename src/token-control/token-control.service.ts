import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Influencers } from 'src/supabase/entities/public-influencer.entity';
import * as nodemailer from 'nodemailer'; // Importando o Nodemailer para o envio de e-mails
import { TokenControl, TokenType } from './entities/token-control.entity';

@Injectable()
export class TokenControlService {
  constructor(
    @InjectRepository(TokenControl)
    private readonly tokenControlRepository: Repository<TokenControl>,
  ) {}

  // Função para gerar um token de 6 dígitos
  private generateToken(): string {
    const token = Math.floor(100000 + Math.random() * 900000); // Gera um número entre 100000 e 999999
    return token.toString();
  }

  // Função para enviar e-mail com o token
  private async sendTokenEmail(
    email: string,
    token: string,
    tokenType: TokenType,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Você pode configurar um serviço de e-mail diferente
      auth: {
        user: process.env.EMAIL_USER, // Seu e-mail
        pass: process.env.EMAIL_PASS, // Sua senha ou senha de app
      },
    });

    // Determinando o caminho do arquivo XML com base no tipo de token
    let xmlFilePath: string;
    let subject: string;

    if (tokenType === TokenType.FORGOT_PASSWORD) {
      // Caminho do arquivo XML para "Esqueci a Senha"
      xmlFilePath = 'src/resources/email-templates/forgot-password.xml';
      subject = 'Recuperação de Senha';
    } else {
      // Caminho do arquivo XML para "Cadastro de Usuário"
      xmlFilePath = 'src/resources/email-templates/create-user.xml';
      subject = 'Criação de Usuário';
    }

    // email noreply@inbazz.com.br
    // senha fqwt ttpm otzy exql

    // Configuração do conteúdo do e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: `Seu token de ${tokenType === TokenType.FORGOT_PASSWORD ? 'recuperação de senha' : 'criação de usuário'} é: ${token}`,
      attachments: [
        {
          filename: `${tokenType === TokenType.FORGOT_PASSWORD ? 'forgot-password' : 'create-user'}.xml`,
          path: xmlFilePath, // Caminho para o arquivo XML
        },
      ],
    };

    // Enviar o e-mail com o anexo XML
    await transporter.sendMail(mailOptions);
  }

  // Função para gerar o token de recuperação de senha ou criação de usuário
  async generateTokenForUser(
    influencer: Influencers,
    token_type: TokenType,
  ): Promise<TokenControl> {
    const token = this.generateToken(); // Gera um token numérico de 6 dígitos
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Token expira em 1 hora

    const tokenControl = this.tokenControlRepository.create({
      token,
      token_type,
      status: 'active',
      influencer,
      expiresAt: expirationDate,
      payload: { email: influencer.email },
    });

    await this.tokenControlRepository.save(tokenControl);

    // Envia o token por e-mail
    await this.sendTokenEmail(influencer.email, token, token_type);

    return tokenControl;
  }

  // Função para validar o token
  async validateToken(token: string): Promise<TokenControl> {
    const tokenControl = await this.tokenControlRepository.findOne({
      where: { token, status: 'active' },
    });

    if (!tokenControl) {
      throw new Error('Token inválido ou expirado');
    }

    // Verifica se o token expirou
    if (new Date() > tokenControl.expiresAt) {
      throw new Error('Token expirado');
    }

    return tokenControl;
  }

  // Função para marcar o token como usado
  async useToken(token: string): Promise<void> {
    const tokenControl = await this.validateToken(token);
    tokenControl.status = 'used';
    tokenControl.usedAt = new Date();
    await this.tokenControlRepository.save(tokenControl);
  }
}
