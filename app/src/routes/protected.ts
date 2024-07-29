import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fastifyPlugin from "fastify-plugin";

async function protectedRoute(fastify: FastifyInstance) {
  fastify.addHook(
    "preHandler",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        console.log("request: ", request.cookies);

        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );

  fastify.get(
    "/protected",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { message: "You are authenticated" };
    }
  );
}

export const protectedModule = fastifyPlugin(protectedRoute);
