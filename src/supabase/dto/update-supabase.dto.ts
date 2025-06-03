import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user-supabase.dto';

export class UpdateSupabaseDto extends PartialType(CreateUserDto) {}
