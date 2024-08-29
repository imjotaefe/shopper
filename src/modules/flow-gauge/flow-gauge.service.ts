import { Injectable } from '@nestjs/common';
import { createFlowGaugeDTO } from './FlowGauge';
import { GeminiFileManager } from 'src/services/Gemini/GeminiFileManager';
import { FileManager } from 'src/utils/FileManager';
import { GeminiGenerativeAI } from 'src/services/Gemini/GeminiGenerativeAI';
const crypto = require('crypto');

@Injectable()
export class FlowGaugeService {
  async newReport(data: createFlowGaugeDTO) {
    const { customer_code, image, measure_datetime, measure_type } = data;
    const fileUpload = new GeminiFileManager();

    const fileManager = new FileManager();
    const tempFileName = crypto.randomUUID();

    await fileManager.createTempFile({
      base64File: image,
      fileName: tempFileName,
    });

    const uploadResponse = await fileUpload.uploadImage({
      fileName: tempFileName,
      displayName: `${measure_type} measure image`,
    });
    if (uploadResponse) {
      await fileManager.cleanTempFolder();
    }
    const generativeAI = new GeminiGenerativeAI();
    const generatedText = await generativeAI.getTextFromImage({ image: image });
    console.log(uploadResponse.file.uri);
    console.log(generatedText.response.text());
  }

  async listReports(data: createFlowGaugeDTO) {
    const { customer_code, image, measure_datetime, measure_type } = data;
    // console.log(customer_code, measure_type, measure_datetime, image);
  }
}
