import { GoogleAIFileManager } from '@google/generative-ai/server';
import { Gemini } from './Gemini';

export class GeminiFileManager {
  private fileManager: GoogleAIFileManager;
  private gemini: Gemini;
  private bufferedImage: string;

  constructor() {
    this.gemini = new Gemini();
    this.fileManager = new GoogleAIFileManager(this.gemini.GEMINI_KEY);
  }

  public async uploadImage({
    fileName,
    displayName,
  }: {
    fileName: string;
    displayName: string;
  }) {
    return await this.fileManager.uploadFile(`temp/${fileName}.jpeg`, {
      mimeType: 'image/jpeg',
      displayName: displayName,
    });
  }
}
