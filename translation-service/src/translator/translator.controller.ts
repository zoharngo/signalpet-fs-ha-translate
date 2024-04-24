import { Controller, Post, Get, Logger } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { TranslateRequest } from './translator.dto';
import { TranslateResponse } from './translator.dto';
import { ReportTranslationRequest } from './translator.dto';
import { ReportTranslationResponse } from './translator.dto';

@Controller('translator')
export class TranslatorController {
  constructor(private readonly translatorService: TranslatorService) {}

  @Post()
  async translate(@Body() body: TranslateRequest): Promise<TranslateResponse> {
    return this.translatorService.translate(body);
  }

  @Post('report')
  async report(
    @Body() body: ReportTranslationRequest,
  ): Promise<ReportTranslationResponse> {
    Logger.log('Received report request');
    return this.translatorService.report(body);
  }

  @Get('health')
  healthCheck(): string {
    return 'OK';
  }
}
