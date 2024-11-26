import { Services } from "@santarepo/configs";
import handleRequest from "./handler";
import { middleware } from "./middleware";

const server = Bun.serve({
  port: Services.Events.port,
  async fetch(req) {
    middleware(req);
    return handleRequest(req);
  },
});
