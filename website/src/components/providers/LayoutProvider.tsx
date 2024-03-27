"use client";

import React, { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import ScrollToTop from "react-scroll-to-top";
import Header from "../layout/Header";
// import VerifyBar from "../layout/VerifyBar";

export default function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const router = useRouter();
  const { data: session }: { data: any } = useSession();

  if (path.startsWith("/auth")) {
    return <>{children}</>;
  }
  return (
    <>
      {/* {session?.user.verified === false && <VerifyBar session={session} />} */}
      <Header />
      <div className="">{children}</div>
      <ScrollToTop smooth />
    </>
  );
}
