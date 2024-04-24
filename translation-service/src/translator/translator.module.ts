import { Module } from '@nestjs/common';
import { TranslatorController } from './translator.controller';
import { TranslatorService } from './translator.service';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [TranslatorController],
  providers: [TranslatorService],
})
export class TranslatorModule {}
