import { Injectable } from '@nestjs/common';
import { confirmMeasureDTO, createMeasureDTO } from './Measure';
import { GeminiFileManager } from 'src/services/Gemini/GeminiFileManager';
import { FileManager } from 'src/utils/FileManager';
import { GeminiGenerativeAI } from 'src/services/Gemini/GeminiGenerativeAI';
import { MeasureRepository } from './measure.repository';
import { CustomException } from 'src/utils/CustomException';
import crypto from 'crypto';

@Injectable()
export class MeasureService {
  constructor(private repository: MeasureRepository) {}

  async createMeasure(data: createMeasureDTO) {
    const { customer_code, image, measure_datetime, measure_type } = data;
    const measureFoundThisMonth =
      await this.repository.getMeasureByCustomerCodeMonthAndType({
        customer_code: customer_code,
        measure_datetime: measure_datetime,
        measure_type: measure_type,
      });

    if (measureFoundThisMonth) {
      throw new CustomException({
        errorCode: 'DOUBLE_REPORT',
        errorDescription: 'Leitura do mês já realizada',
        statusCode: 409,
      });
    }
    // const fileUpload = new GeminiFileManager();

    // const fileManager = new FileManager();
    // const tempFileName = crypto.randomUUID();

    // await fileManager.createTempFile({
    //   base64File: image,
    //   fileName: tempFileName,
    // });

    // const uploadResponse = await fileUpload.uploadImage({
    //   fileName: tempFileName,
    //   displayName: `${measure_type} measure image`,
    // });
    // if (uploadResponse) {
    //   await fileManager.cleanTempFolder();
    // }
    // const generativeAI = new GeminiGenerativeAI();
    // const generatedText = await generativeAI.getTextFromImage({ image: image });
    // console.log(uploadResponse.file.uri);
    // console.log(generatedText.response.text());
  }

  async confirmMeasure(data: confirmMeasureDTO) {
    const { measure_uuid, confirmed_value } = data;

    const measureFound = await this.repository.getMeasureByUUID(measure_uuid);

    if (!measureFound) {
      throw new CustomException({
        errorCode: 'MEASURE_NOT_FOUND',
        errorDescription: 'Leitura não encontrada',
        statusCode: 404,
      });
    }
    if (measureFound.has_confirmed) {
      throw new CustomException({
        errorCode: 'CONFIRMATION_DUPLICATE',
        errorDescription: 'Leitura do mês já realizada',
        statusCode: 409,
      });
    }

    await this.repository.updateMeasureValue({
      measure_uuid: measure_uuid,
      measure_value: confirmed_value,
    });

    return {
      success: true,
    };
  }

  async listMeasures({ customer_code, measure_type }) {
    const measures = await this.repository.listByCustomerCodeAndMeasureType({
      customer_code,
      measure_type: measure_type || undefined,
    });

    if (measures.length <= 0) {
      throw new CustomException({
        errorCode: 'MEASURES_NOT_FOUND',
        errorDescription: 'Nenhuma leitura encontrada',
        statusCode: 404,
      });
    }

    const measuresFiltered = measures.map((measure) => {
      return {
        measure_uuid: measure.measure_uuid,
        measure_datetime: measure.measure_datetime,
        measure_type: measure.measure_type,
        has_confirmed: measure.has_confirmed,
        image_url: measure.image_url,
      };
    });

    return { customer_code, measures: measuresFiltered };
  }
}
