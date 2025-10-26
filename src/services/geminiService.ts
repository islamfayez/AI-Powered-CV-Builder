import { GoogleGenAI, Type } from "@google/genai";
import { CVData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const cvSchema = {
  type: Type.OBJECT,
  properties: {
    fullName: { type: Type.STRING, description: "Full name of the person." },
    title: { type: Type.STRING, description: "Professional title or role, like 'Senior Software Engineer'." },
    contact: {
      type: Type.OBJECT,
      properties: {
        email: { type: Type.STRING, description: "Email address." },
        phone: { type: Type.STRING, description: "Phone number." },
        website: { type: Type.STRING, description: "Personal website or portfolio URL." },
        linkedin: { type: Type.STRING, description: "LinkedIn profile URL." },
      },
      required: ["email", "phone"]
    },
    summary: { type: Type.STRING, description: "A 3-4 sentence professional summary." },
    experiences: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          company: { type: Type.STRING },
          duration: { type: Type.STRING, description: "e.g., 'Jan 2020 - Present'" },
          details: { type: Type.STRING, description: "Bulleted list of responsibilities and achievements." },
        },
        required: ["role", "company", "duration", "details"]
      }
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          degree: { type: Type.STRING, description: "e.g., 'B.S. in Computer Science'" },
          institute: { type: Type.STRING },
          year: { type: Type.STRING, description: "e.g., '2016 - 2020'" },
        },
        required: ["degree", "institute", "year"]
      }
    },
    skills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of relevant technical and soft skills."
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          link: { type: Type.STRING, description: "URL to the project or repository." },
          details: { type: Type.STRING, description: "A brief description of the project." },
        },
        required: ["title", "details"]
      }
    },
    certifications: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          issuer: { type: Type.STRING },
          year: { type: Type.STRING },
        },
        required: ["name", "issuer"]
      }
    },
    languages: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of languages spoken, e.g., 'English (Native)', 'Spanish (Professional)'"
    },
    hobbies: { type: Type.STRING, description: "A short list of hobbies or interests." }
  },
  required: ["fullName", "title", "contact", "summary", "experiences", "education", "skills"]
};

export const generateCVData = async (prompt: string): Promise<CVData> => {
  try {
    const fullPrompt = `Based on the following job role or description, generate a complete, professional CV in JSON format. The CV should be well-written, tailored to the role, and contain realistic but impressive details. Job Role/Description: "${prompt}"`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: cvSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("API returned an empty response.");
    }
    
    const parsedJson = JSON.parse(text);
    return parsedJson as CVData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate CV data from Gemini API.");
  }
};
