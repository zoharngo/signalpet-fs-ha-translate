export interface TranslateRequest {
  text: string;
  targetLanguage: string;
}

export interface TranslateResponse {
  translatedText: string;
}

export interface ReportTranslationRequest {
  text: string[];
  targetLanguage: string;
}

export interface ReportTranslationResponse {
  translatedText: string[];
}
