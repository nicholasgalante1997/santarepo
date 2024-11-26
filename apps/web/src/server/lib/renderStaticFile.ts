import path from "path";
import fs from "fs/promises";

import { mimeTypes } from "./mime";

const staticFileDirectories = ["public", "out"] as const;

export async function isRequestForStaticFile(request: Request) {
  const url = new URL(request.url);
  for (const directory of staticFileDirectories) {
    const stdpath = path.join(process.cwd(), directory, url.pathname);
    try {
      if (await fs.exists(stdpath)) {
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  return false;
}

export async function handleStaticFileRequest(request: Request) {
  const url = new URL(request.url);
  for (const directory of staticFileDirectories) {
    const stdpath = path.join(process.cwd(), directory, url.pathname);
    try {
      if (await fs.exists(stdpath)) {
        const file = await fs.readFile(stdpath);
        const ext = path.extname(url.pathname);
        const contentType = mimeTypes[ext] ?? "application/octet-stream";
        return new Response(file, {
          headers: { "Content-Type": contentType },
          status: 200,
        });
      }
    } catch (e) {
      return new Response("Not Found", { status: 404 });
    }
  }

  return new Response("Not Found", { status: 404 });
}
