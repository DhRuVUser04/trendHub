import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { authOptions } from "./app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

// Define a type for Middleware functions
type Middleware = (
  req: NextRequest,
  ev: NextFetchEvent
) => Promise<NextResponse | void>;

// Custom middleware example
const navRules: Middleware = async (req, ev) => {
  const token = await getToken({ req });
  if (
    token &&
    token.onBoardingComplete === false &&
    !req.nextUrl.pathname.startsWith("/onboarding")
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.nextUrl));
  }
};
const customMiddleware2: Middleware = async (req, ev) => {
  console.log("Custom Middleware Executed 2");
  // Add your custom logic here. For example:
  // if (!req.nextUrl.pathname.startsWith('/allowed-path')) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }
};

// Function to chain multiple middleware functions
const runMiddleware = async (
  req: NextRequest,
  ev: NextFetchEvent,
  middlewares: Middleware[]
) => {
  for (const middleware of middlewares) {
    const response = await middleware(req, ev);
    if (response instanceof NextResponse) return response;
  }
  return NextResponse.next();
};

export default withAuth(
  async (req: NextRequest, ev: NextFetchEvent) => {
    return await runMiddleware(req, ev, [navRules, customMiddleware2]);
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        // console.log(token);
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/checkout/:path*"],
};
