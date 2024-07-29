import { fastifyJwt } from "@fastify/jwt";
import fastify from "fastify";
import fastitfyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
const server = fastify();
import { signInModule } from "./src/routes/signIn";
import { protectedModule } from "./src/routes/protected";
import { signUpModule } from "./src/routes/signup";
import { postModule } from "./src/routes/post";
server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.register(fastifyCors, {
  origin: "http://localhost:9000", // Enable CORS for all origins. Adjust as needed for your specific use case.
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
});

server.register(fastitfyCookie);

server.register(fastifyJwt, {
  secret: "5084235853f5177c44c0a1a36e1181a696aef8020e000520337e794c8baafe09",
  cookie: { cookieName: "token", signed: false },
});

server.register(signInModule);
server.register(signUpModule);
server.register(postModule);
// server.register(protectedModule);

const start = async () => {
  try {
    server.listen({ port: 8080 }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
