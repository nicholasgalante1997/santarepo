import debug from "debug";

export function middleware(request: Request) {
  debug("santarepo:events:middleware")("Request %o", request);
}
