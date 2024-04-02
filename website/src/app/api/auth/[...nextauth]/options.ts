import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { checkRateLimit } from "@/utils/ratelimit";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma/prisma";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        const { email, password }: { email: string; password: string } =
          credentials;
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        // console.log(email);

        // rate limit
        await checkRateLimit();
        let user: any;
        try {
          // Find the user by email in your database
          user = await prisma.user.findUnique({
            where: { email },
            select: {
              email: true,
              password: true,
              id: true,
              role: true,
              isVerified: true,
              name: true,
            },
          });
        } catch (error: any) {
          console.log(error.message);
        }

        if (!user) {
          throw new Error("User not found!");
        }

        // If the user exists, compare the passwords

        const matchPass = bcrypt.compareSync(password, user.password);
        if (!matchPass) throw new Error("Email or Password did'nt match!");

        if (user && matchPass) {
          // Passwords match, return the user object
          return user;
        } else {
          // If credentials are invalid, return null
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
      newUser: "/auth/new", 
      
  },
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      const email = user.email;

      const authProvider = account.provider;

      // check if already exists
      const existingUser = await prisma.user.findUnique({
        where: { email, isActive: true },
        select: {
          email: true,
          password: true,
          id: true,
          role: true,
          isVerified: true,
          name: true,
          authProvider: true,
          status: true,
        },
      });

      if (existingUser) {
        // User already exists, check if the provider is the same
        if (existingUser.authProvider !== authProvider) {
          throw new Error(
            "Your email is already registered with a different provider"
          );
        }
        if (existingUser.status === "blocked") {
          throw new Error("Your account is blocked!");
        }
      } else {
        // User does not exist, create a new user
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            password: "randomString",
            authProvider: authProvider,
            isVerified: true,
          },
        });
      }

      return user;
    },
    async jwt({
      token,
      user,
      session,
      trigger,
    }: {
      token: any;
      user: any;
      session: any;
      trigger: any;
    }) {
      if (trigger === "update" && session?.verified) {
        token.verified = session.verified;
      }

      if (trigger === "update" && session?.onboardingComplete) {
        token.onboardingComplete = session.onboardingComplete;
        // await prisma.user.update({
        //   where: { id: session?.id },
        //   data: {
        //     onboardingComplete:
        //       session.onboardingComplete === "true" ? true : false,
        //   },
        // });
      }

      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }

      if (trigger === "update" && session?.name) {
        token.name = session.name;
        await prisma.user.update({
          where: { id: session.id },
          data: { name: session.name },
        });
      }

      if (trigger === "update" && session?.phoneNumber) {
        token.phoneNumber = session.phoneNumber;
        await prisma.user.update({
          where: { id: session.id },
          data: { phoneNumber: session.phoneNumber },
        });
      }

      if (user) {
        return {
          ...token,
          id: user?.id,
          role: user?.role,
          verified: user?.isVerified,
          name: user?.name,
        };
      }

      return token;
    },
    async session({
      token,
      user,
      session,
    }: {
      token: any;
      user: any;
      session: any;
    }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          verified: token.verified,
          name: token.name,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
