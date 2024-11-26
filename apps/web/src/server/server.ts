import { Services } from "@santarepo/configs";
import { handleRequest } from "./lib/handleRequest";
import { middleware } from "./middleware/middleware";

export const serve = () => {
  return Bun.serve({
    port: Services.Web.port,
    async fetch(req) {
      middleware(req);
      return handleRequest(req);
    },
  });
};
