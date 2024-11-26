import { serve } from "./server/server";
import log from "./server/log";

const server = serve();
log(`Listening on http://%s:%d :rocket: `, server.hostname, server.port);
