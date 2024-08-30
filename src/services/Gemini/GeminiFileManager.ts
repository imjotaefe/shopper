import { GoogleAIFileManager } from '@google/generative-ai/server';
import { Gemini } from './Gemini';

interface UploadImage {
  filePath: string;
  displayName: string;
}

export class GeminiFileManager {
  private fileManager: GoogleAIFileManager;
  private gemini: Gemini;

  constructor() {
    this.gemini = new Gemini();
    this.fileManager = new GoogleAIFileManager(this.gemini.GEMINI_KEY);
  }

  public async uploadImage({ filePath, displayName }: UploadImage) {
    return await this.fileManager.uploadFile(filePath, {
      mimeType: 'image/jpeg',
      displayName: displayName,
    });
  }
}
