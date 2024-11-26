import React, { useState } from "react";
import { type InputProps } from "./PictureInput.types";
import { Services } from "@santarepo/configs";

function PictureInput(props: InputProps) {
  const [url, setUrl] = useState("");

  async function analyzeLetter(e: React.FormEvent) {
    e.preventDefault();
    const data = await uploadPicture(url);
    props.setResponseLetterData(data);
    props.setResponseTableData(data);
  }

  return (
    <>
      <form
        onSubmit={analyzeLetter}
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <fieldset>
          <input
            id="url"
            type="url"
            aria-label="Picture URL upload"
            placeholder="example-picture-url.jpg"
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="button-primary"
            disabled={url.length < 1}
          >
            Upload
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default PictureInput;

async function uploadPicture(urlToSend: string) {
  try {
    const response = await fetch(urlToSend);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();

    const base64String = await convertBlobToBase64(blob);

    const apiResponse = await fetch(`http://localhost:${Services.LargeLanguageModel.port}/api/models/gemini/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(base64String),
    });

    if (!apiResponse.ok) {
      throw new Error("Failed to upload picture");
    }

    return apiResponse.json();
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while uploading the picture");
  }
}

function convertBlobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
