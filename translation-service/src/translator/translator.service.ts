import { Inject, Injectable, Logger } from '@nestjs/common';
import { TranslateRequest } from './translator.dto';
import { TranslateResponse } from './translator.dto';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ReportTranslationRequest } from './translator.dto';
import { ReportTranslationResponse } from './translator.dto';

@Injectable()
export class TranslatorService {
  constructor(
    private http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async translate(body: TranslateRequest): Promise<TranslateResponse> {
    if (!body.text) {
      return { translatedText: '' };
    }
    const cacheKey = `${body.text}-${body.targetLanguage}`;
    let translatedText: string = await this.cacheManager.get(cacheKey);
    if (translatedText) {
      Logger.log('Cache hit');
      return { translatedText };
    }
    const { text, targetLanguage } = body;
    // This is where the translation would happen
    const request = this.http
      .post('http://localhost:5000/translate', {
        q: text,
        target: targetLanguage,
        source: 'en',
      })
      .pipe(map((response) => response.data?.translatedText));
    translatedText = await lastValueFrom(request);
    await this.cacheManager.set(cacheKey, translatedText);
    return { translatedText };
  }

  async report(
    body: ReportTranslationRequest,
  ): Promise<ReportTranslationResponse> {
    const { text, targetLanguage } = body;
    const response = await Promise.all(
      text.map((t) => this.translate({ text: t, targetLanguage })),
    );
    return { translatedText: response.map((r) => r.translatedText) };
  }
}
