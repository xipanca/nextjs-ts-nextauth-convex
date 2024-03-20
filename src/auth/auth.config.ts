import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/auth", nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.username = user.username;
        token.image = user.image as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.image;
        session.user.username = token.username;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/`;
    },
  },
  providers: [],
  secret: process.env.AUTH_SECRET as string,
} satisfies NextAuthConfig;
