import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import fastifyPlugin from "fastify-plugin";

interface SignInBody {
  username: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  password: string;
}
const users: User[] = [];
async function signUpRoute(fastify: FastifyInstance) {
  fastify.post(
    "/signup",
    async (
      request: FastifyRequest<{ Body: SignInBody }>,
      reply: FastifyReply
    ) => {
      // TODO uncomment when continue developing
      const { username, password } = request.body;
      console.log("body: ", request.body);

      // Check if the user already exists
      console.log("users: ", users);

      //   TODO uncomment when need to develop
      //   if (users.find((user) => user.username === username)) {
      //     return reply.status(400).send({ error: "User already exists" });
      //   }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the user to the database (in this case, an array)
      const user = { id: 1, username, password: hashedPassword };
      users.push(user);

      // Sign the JWT
      const token = fastify.jwt.sign({ username });
      console.log("token: ", token);

      // Set the cookie
      reply
        .setCookie("token", token, {
          httpOnly: true,
          secure: true, // Set to true if using https
          sameSite: "strict",
          expires: new Date(Date.now() + 30 * 1000),
        })
        .send({ message: "User created successfully" });
    }
  );
}

export const signUpModule = fastifyPlugin(signUpRoute);
