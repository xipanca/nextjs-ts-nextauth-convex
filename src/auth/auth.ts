import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";

// async createUser(userData) {
//   const userId = await fetchMutation(
//     api.user.create,
//     doc.getUser(userData),
//   );
//   return {
//     ...userData,
//     id: userId,
//   };
// }
async function getUser(
  identifier: { key: string; value: string },
  password: string,
) {
  try {
    let user;
    if (identifier.key == "email")
      user = fetchQuery(api.user.getByEmail, { email: identifier.value });

    if (identifier.key == "username")
      user = fetchQuery(api.user.getByUserName, { username: identifier.value });

    return user;
  } catch (error) {
    throw error;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ identifier: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { identifier, password } = parsedCredentials.data;
          const isEmail = identifier.includes("@");
          const user = await getUser(
            { key: isEmail ? "email" : "username", value: identifier },
            password,
          );
          if (!user) return null;
          console.log(user);
          return {
            id: user._id.toString(),
            username: user.username,
            image: user.image || "",
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
});
