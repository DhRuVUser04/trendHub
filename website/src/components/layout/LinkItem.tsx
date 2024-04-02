"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LinkItem = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) => {
  const path = usePathname();
  const { data: session } = useSession();
  return (
    <Link href={href === "/account" ? (session ? href : "/auth/login") : href}>
      <div
        className={cn(
          "flex gap-0.5 items-center justify-center flex-col text-2xl hover:text-primary transition-all duration-300",
          {
            "text-primary": path === href,
          }
        )}
      >
        {icon}
        <p className="text-xs font-medium">{label}</p>
      </div>
    </Link>
  );
};

export default LinkItem;
