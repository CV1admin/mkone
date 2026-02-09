
import { GoogleGenAI, Type } from "@google/genai";
import { MKoneHypothesis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMKoneHypothesis = async (query: string): Promise<MKoneHypothesis | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a theoretical hypothesis within the MKone world-modeling framework for the following domain: ${query}. 
      Remember: MKone is a unifying framework spanning physics, information theory, and cognition. 
      The output should be exploratory and labeled as a hypothesis.`,
      config: {
        systemInstruction: "You are the MKone Core Interpreter. Your goal is to apply MKone's interdisciplinary lens to user queries. Always maintain a tone of humility and remind users that models are not reality.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            domain: { type: Type.STRING },
            coherencePattern: { type: Type.STRING, description: "Description of the unifying pattern found." },
            structuralPattern: { type: Type.STRING, description: "Computational or mathematical structure suggested." },
            uncertaintyRating: { type: Type.NUMBER, description: "Scale 1-10 of how experimental this is." },
            alternatePerspectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["domain", "coherencePattern", "structuralPattern", "uncertaintyRating", "alternatePerspectives"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim()) as MKoneHypothesis;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
