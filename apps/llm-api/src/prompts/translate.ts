import Gemini from "@/models/Gemini";

type SendTranslateImagePromptOptions = {
  image: string;
  source: {
    language: "en" | "es";
    usps: {
      iri: string;
    };
  };
};

async function sendTranslateImagePrompt(
  options: SendTranslateImagePromptOptions,
) {
  try {
    // Prepare the request
    const prompt = {
      input: "Translate the written text within this image into text",
      context:
        "Provide a textual transcription of any visible text in the image.",
      image: {
        content: base64Image,
        mimeType: "image/jpeg", // Adjust based on your image format
      },
    };

    // Use the most affordable model (e.g., 'gpt-lite' or similar if available)
    const model = "gpt-lite"; // Replace with the actual affordable model name
    const response = await client.generate(model, prompt);

    // Handle the response
    if (response.text) {
      console.log("Translation Result:");
      console.log(response.text);
    } else {
      console.error("No text result was returned from the API.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
