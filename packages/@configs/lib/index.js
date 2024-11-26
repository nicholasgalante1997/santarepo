const Services = {};

Services.Auth = {
  port: 4100,
  name: "@santarepo/auth",
  type: "server",
  runtime: "bun",
  host: "localhost",
  paths: [
    {
      path: "/token/create",
      method: "POST",
      protected: false,
      schema: {
        // TODO schema with zod
      },
    },
  ],
};

Services.Events = {
  port: 4200,
  name: "@santarepo/events",
  type: "server",
  runtime: "bun",
  host: "localhost",
  paths: [],
};

Services.LargeLanguageModel = {
  port: 4300,
  name: "@santarepo/llm-api",
  type: "server",
  runtime: "bun",
  host: "localhost",
  paths: [
    {
      path: "/api/models/gemini/create",
      method: "POST",
      protected: true,
      schema: {
        // TODO schema with zod
      },
    },
  ],
};

Services.Web = {
  port: 3000,
  name: "@santarepo/web",
  type: "server",
  runtime: "bun",
  host: "localhost",
  paths: [],
};

Object.freeze(Services);

export { Services };
