import debug from "debug";
import { Services } from "@santarepo/configs";

import handleRequest from "./handler";

const log = debug("santarepo:auth:server");

function middleware(request: Request) {
  log("Request %o", request);
}

const server = Bun.serve({
  port: Services.Auth.port,
  fetch(req) {
    middleware(req);
    return handleRequest(req);
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
