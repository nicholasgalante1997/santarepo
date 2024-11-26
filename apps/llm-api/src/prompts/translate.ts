import Gemini from "@/models/Gemini";
import type { TextPart } from "@google/generative-ai";

type SendTranslateImagePromptOptions = {
  base64Image: string; 
  mimeType?: string;
};

async function sendTranslateImagePrompt(options: SendTranslateImagePromptOptions) {
  try {
    if (!options.base64Image) {
      throw new Error("Missing base64 image content");
    }

    const gemini = new Gemini();

    const prompt = {
      contents: [
        {
          role: "system", // Assuming role "system" for context setup
          parts: [
            {
              type: "text", // Specifying the part type as text
              content: "Translate the written text within this image into text.",
            },
          ] as TextPart[],
        },
        {
          role: "context", // Assuming role "context" for additional info
          parts: [
            {
              type: "text",
              content: "Provide a textual transcription of any visible text in the image.",
            },
          ],
        },
        {
          role: "image", // The image role with base64 content
          parts: [
            {
              type: "image", // Define part type as image
              content: options.base64Image,
              mimeType: options.mimeType || "image/jpeg", // Default MIME type
            },
          ],
        },
      ]
    };

    const result = await gemini.generate(prompt);

    if (!result || !result.text) {
      throw new Error("No text result was returned from the API.");
    }

    console.log("Translation Result:", result.text);
    return result.text;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export default sendTranslateImagePrompt;
