import { Services } from "@santarepo/configs";
import { emojify } from "node-emoji";
import handleRequest from "./handler";

const server = Bun.serve({
  port: Services.LargeLanguageModel.port,
  fetch(req) {
    return handleRequest(req);
  },
});

console.log(emojify(`Listening on http://localhost:${server.port} :rocket: `));
