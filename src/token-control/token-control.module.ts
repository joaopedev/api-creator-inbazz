import { Module } from '@nestjs/common';
import { TokenControlService } from './token-control.service';
import { TokenControlController } from './token-control.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [TokenControlController],
  providers: [TokenControlService],
})
export class TokenControlModule {}
