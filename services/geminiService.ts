
import { GoogleGenAI, Type } from "@google/genai";
import { MKoneHypothesis } from "../types";

// The GoogleGenAI instance should be created inside the function to ensure the latest API key is used.
export const generateMKoneHypothesis = async (query: string, thinkingBudget?: number): Promise<MKoneHypothesis | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a theoretical hypothesis within the Civilisation.one world-modeling framework for the following domain: ${query}. 
      Remember: Civilisation.one is a unifying framework spanning physics, information theory, and cognition. 
      The output should be exploratory and labeled as a hypothesis. 
      For alternate perspectives, provide a 'weight' from 1-10 indicating its structural relevance to the core hypothesis.`,
      config: {
        systemInstruction: "You are the Civilisation.one Core Interpreter. Your goal is to apply our interdisciplinary lens to user queries. Always maintain a tone of humility and remind users that models are not reality.",
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
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  weight: { type: Type.NUMBER, description: "Structural relevance weight from 1-10" }
                },
                required: ["text", "weight"]
              }
            }
          },
          required: ["domain", "coherencePattern", "structuralPattern", "uncertaintyRating", "alternatePerspectives"]
        },
        // thinkingBudget is only available for Gemini 3 and 2.5 series models.
        thinkingConfig: thinkingBudget !== undefined ? { thinkingBudget } : undefined,
      }
    });

    // Accessing response.text directly as it is a property.
    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim()) as MKoneHypothesis;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
