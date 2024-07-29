import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fastifyPlugin from "fastify-plugin";

interface SignInBody {
  username: string;
  password: string;
}

const users = [
  {
    id: 6,
    username: "user1",
    password: "password1", // In a real app, use hashed passwords and secure storage
  },
];

async function postRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/post",
    async (request: FastifyRequest<{ Body: SignInBody }>) => {
      const { token } = request.cookies;
      console.log("token post: ", token);
    }
  );
}

export const postModule = fastifyPlugin(postRoutes);
