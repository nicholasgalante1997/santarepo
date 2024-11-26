import React from "react";
import { renderToReadableStream } from "react-dom/server";

import App from "../../App";

export async function renderApp() {
  const stream = await renderToReadableStream(<App />, {
    bootstrapModules: ["/src/browser/index.js"],
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/html" },
  });
}
