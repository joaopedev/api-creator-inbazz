import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, select: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true, select: false })
  confirm_password: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deleted_at?: Date | null;

  @Column({ type: 'int', default: 0 })
  stickers_number: number;

  @Column({ type: 'int', default: 50 })
  coins: number;

  @Column({ type: 'int', default: 0 })
  conquests: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  last_login?: Date | null;

  @Column({ type: 'int', default: 1 })
  level: number;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  resetPasswordExpires: Date;

  @Column({ type: 'boolean', default: false })
  is_super_admin: boolean;

  @Column({ type: 'boolean', default: false })
  is_sso_user: boolean;

  @Column({ type: 'boolean', default: false })
  is_anonymous: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  email_confirmed_at?: Date | null;

  @Column({ type: 'timestamp with time zone', nullable: true })
  invited_at?: Date | null;

  @Column({ type: 'varchar', nullable: true })
  confirmation_token: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  confirmation_sent_at?: Date | null;

  @Column({ type: 'varchar', nullable: true })
  recovery_token: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  recovery_sent_at?: Date | null;

  @Column({ type: 'varchar', nullable: true })
  email_change_token_new: string;

  @Column({ type: 'varchar', nullable: true })
  email_change: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  email_change_sent_at?: Date | null;

  @Column({ type: 'varchar', nullable: true })
  email_change_token_current: string;

  @Column({ type: 'smallint', nullable: true })
  email_change_confirm_status: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  banned_until?: Date | null;

  @Column({ type: 'varchar', nullable: true })
  reauthentication_token: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  reauthentication_sent_at?: Date | null;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  phone_confirmed_at?: Date | null;

  @Column({ type: 'text', nullable: true })
  phone_change: string;

  @Column({ type: 'varchar', nullable: true })
  phone_change_token: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  phone_change_sent_at?: Date | null;

  @Column({ type: 'timestamp with time zone', nullable: true })
  last_sign_in_at?: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  raw_app_meta_data: object;

  @Column({ type: 'jsonb', nullable: true })
  raw_user_meta_data: object;
}
