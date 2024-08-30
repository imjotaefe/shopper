import { FileManager } from 'src/utils/FileManager';
import { GeminiFileManager } from '../services/Gemini/GeminiFileManager';
import { GeminiGenerativeAI } from '../services/Gemini/GeminiGenerativeAI';
import { createMeasureDTO, measure_type } from 'src/modules/measure/Measure';
import { CustomException } from './CustomException';

export class ImageHandler {
  private geminiFileManager: GeminiFileManager;
  private systemFileManager: FileManager;
  private generativeAI: GeminiGenerativeAI;
  private tempFileName: string;
  private image: string;
  private measure_type: createMeasureDTO['measure_type'];

  constructor({
    image,
    measure_type,
  }: {
    image: string;
    measure_type: createMeasureDTO['measure_type'];
  }) {
    this.geminiFileManager = new GeminiFileManager();
    this.systemFileManager = new FileManager();
    this.generativeAI = new GeminiGenerativeAI();
    this.tempFileName = crypto.randomUUID();
    this.image = image;
    this.measure_type = measure_type;
  }

  async getMeasureFromImage() {
    try {
      await this.systemFileManager.createTempFile({
        base64File: this.image,
        fileName: this.tempFileName,
      });

      const uploadResponse = await this.uploadImage();

      if (uploadResponse) {
        await this.systemFileManager.cleanTempFolder();
      }

      const measure = await this.generateImage();
      return {
        measure,
        temp_url: uploadResponse.file.uri,
      };
    } catch (error) {
      throw new CustomException({
        errorCode: 'GEMINI_ERROR',
        errorDescription: 'Erro durante a leitura pelo Gemini',
        statusCode: 404,
      });
    }
  }

  private async uploadImage() {
    const uploadResponse = await this.geminiFileManager.uploadImage({
      filePath: `temp/${this.tempFileName}.jpeg`,
      displayName: `${measure_type} measure image`,
    });

    return uploadResponse;
  }

  private async generateImage() {
    const generatedText = await this.generativeAI.getTextFromImage({
      image: this.image,
    });
    return generatedText.response.text();
  }
}
