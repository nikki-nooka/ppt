import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    // We don't throw here to allow the UI to render an error state gracefully
  }
  return new GoogleGenAI({ apiKey: apiKey || 'dummy_key' });
};

export const analyzeEnvironmentImage = async (base64Image: string): Promise<string> => {
  try {
    const ai = getClient();
    const modelId = 'gemini-2.5-flash'; 
    
    const prompt = `
      Analyze this image for potential health hazards. 
      Focus on: Pollution levels, stagnant water (mosquito risk), garbage, or allergens.
      Return a concise JSON response with:
      1. riskLevel (Low, Medium, High)
      2. hazards (Array of strings detecting specific issues)
      3. recommendation (One short sentence on what to do)
    `;

    // Clean the base64 string if it has the prefix
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/png', data: cleanBase64 } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING },
            hazards: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendation: { type: Type.STRING }
          }
        }
      }
    });

    return response.text || "{}";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw error;
  }
};

export const getChatResponse = async (message: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  try {
    const ai = getClient();
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are GeoSick AI, a helpful health assistant. Keep answers short, empathetic, and health-focused.",
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm having trouble connecting to the health network right now.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Error connecting to AI service.";
  }
};
