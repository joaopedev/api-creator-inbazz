import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { TokenControlModule } from './token-control/token-control.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), SupabaseModule, TokenControlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
