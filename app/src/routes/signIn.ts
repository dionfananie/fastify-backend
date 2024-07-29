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

async function signInRoute(fastify: FastifyInstance) {
  fastify.post(
    "/signin",
    async (
      request: FastifyRequest<{ Body: SignInBody }>,
      reply: FastifyReply
    ) => {
      const { username, password } = request.body;
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (!user) {
        return reply
          .status(401)
          .send({ message: "Invalid username or password" });
      }

      const token = fastify.jwt.sign({
        id: user.id,
        name: user.username,
      });
      console.log("token: ", token);

      reply
        .setCookie("token", token, {
          httpOnly: true,
          //   secure: process.env.NODE_ENV === "production", // Set to true in production
          secure: true, // Set to true in production
          sameSite: true,
        })
        .send({ message: "Signed in successfully" });
    }
  );
}

export const signInModule = fastifyPlugin(signInRoute);
