import TokenManager from "@/models/TokenManager";

async function handleRequest(request: Request) {
  const requestUrl = new URL(request.url);
  const requestMethod = request.method;
  const requestPath = requestUrl.pathname;
  const requestJson = await request.json();
  const networkTokenProvided = requestJson.networkToken || "";
  const networkTokenFromEnv = process.env.NETWORK_TOKEN;

  if (
    requestMethod !== "POST" ||
    !networkTokenFromEnv ||
    !networkTokenProvided
  ) {
    return new Response("Unauthorized Request", { status: 401 });
  }

  if (networkTokenFromEnv !== networkTokenProvided) {
    return new Response("Unauthorized Request", { status: 401 });
  }

  switch (requestPath) {
    case "/token/create": {
      const token = TokenManager.createToken();
      return Response.json({ token }, { status: 200 });
    }
    case "/token/validate": {
      const token = requestJson.token;
      const isValid = TokenManager.validateToken(token);
      return Response.json({ isValid }, { status: 200 });
    }
    default: {
      return new Response("Not Found", { status: 404 });
    }
  }
}

export default handleRequest;
