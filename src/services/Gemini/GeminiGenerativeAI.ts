import { Gemini } from './Gemini';

interface GetTextFromImage {
  image: string;
}
export class GeminiGenerativeAI {
  private gemini: Gemini;

  constructor() {
    this.gemini = new Gemini();
  }

  public async getTextFromImage({ image }: GetTextFromImage) {
    return await this.gemini.getModel().generateContent([
      {
        inlineData: { data: image, mimeType: 'image/png' },
      },
      {
        text: 'You are a specialist on water/gas measure. this is a water/gas gate controller. There is 6 digits separated in boxes that rolls up, so you must consider number cuted in the middle, for example, it shows the middle of the number 4 and the start of the number 5, so it should consider the number 5. Return only the main number in the image. Your answer should be only numbers, without text. So it should have a very nice precision',
      },
    ]);
  }
}
