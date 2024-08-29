import { Gemini } from './Gemini';

export class GeminiGenerativeAI {
  private gemini: Gemini;

  constructor() {
    this.gemini = new Gemini();
  }

  public async getTextFromImage({ image }: { image: string }) {
    return await this.gemini.getModel().generateContent([
      {
        inlineData: { data: image, mimeType: 'image/png' },
      },
      {
        text: 'You are a specilist on water measure. this is a water gate controller. There is 6 digits separated in boxes that rolls up, so you must consider number cuted in the middle, for example, it shows the middle of the number 4 and the start of the number 5, so it should consider the number 5. Return the main number in the image in m³. So it should have a very nice precision',
      },
    ]);
  }
}
