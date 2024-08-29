import { GoogleGenerativeAI } from '@google/generative-ai';

export class Gemini {
  GEMINI_KEY: string;
  genAI: GoogleGenerativeAI;

  constructor() {
    this.GEMINI_KEY = process.env.GEMINI_API_KEY;
    this.genAI = new GoogleGenerativeAI(this.GEMINI_KEY);
  }

  getModel() {
    return this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });
  }
}
