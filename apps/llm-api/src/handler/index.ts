export default async function handleRequest(req: Request) {
  console.log("Request %o", req);

  const url = new URL(req.url);
  const body = await req.json();

  if (req.method !== "POST") {
    return new Response("Unauthorized Request", { status: 401 });
  }

  if (!body) {
    return new Response("Unauthorized Request", { status: 401 });
  }

  const csrf = body?.event?.__csrfToken;

  if (!csrf) {
    return new Response("Unauthorized Request", { status: 401 });
  }

  //   const isValidRequest = await validateCsrfToken(csrf);

  if (url.pathname === "/api/models/gemini/create") {
    
  }

  return new Response();
}
