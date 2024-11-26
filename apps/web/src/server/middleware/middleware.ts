import log from "../log";

export function middleware(request: Request) {
  log("Request %o", request);
}
