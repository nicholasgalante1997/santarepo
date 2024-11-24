import React, { useState } from 'react'
import { type InputProps } from './PictureInput.types';


function PictureInput(props: InputProps) {
  const [url, setUrl] = useState("");


  function analyzeLetter(e: React.FormEvent) {
    e.preventDefault();
    const data = uploadPicture(url);
    props.setResponseLetterData(data);
    props.setResponseTableData(data);
}

  return (
    <>
      <form onSubmit={analyzeLetter} style={{ maxWidth: "600px", margin: "auto" }}>
      <fieldset>
        {/* <legend>Upload a Picture</legend> */}
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
  )
}

export default PictureInput;

async function uploadPicture (urlToSend: string){
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ urlToSend }),
  });

  if (!response.ok) {
    throw new Error('Failed to upload picture');
  }

  return response.json();
};