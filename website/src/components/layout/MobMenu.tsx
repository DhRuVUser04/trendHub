import React from "react";
import MaxWidthWrapper from "../wrappers/MaxWidthWrapper";
import Link from "next/link";
import { GoHeart, GoHome, GoSearch } from "react-icons/go";
import { usePathname } from "next/navigation";
import LinkItem from "./LinkItem";
import { BsCart3 } from "react-icons/bs";
import { IoPersonCircleOutline, IoStorefrontOutline } from "react-icons/io5";

const itemData = [
  {
    label: "Store",
    href: "/store",
    icon: <IoStorefrontOutline />,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: <GoHeart />,
  },
  {
    label: "Home",
    href: "/",
    icon: <GoHome />,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: <BsCart3 />,
  },
  {
    label: "Account",
    href: "/account",
    icon: <IoPersonCircleOutline />,
  },
];

export default function MobMenu() {
  return (
    <div className="fixed bottom-4 w-full left-0">
      <MaxWidthWrapper>
        <div className="flex items-center justify-evenly h-16 w-full rounded-full bg-white drop-shadow-2xl shadow-2xl px-3">
          {itemData?.map((item, index) => (
            <LinkItem
              label={item.label}
              href={item.href}
              icon={item.icon}
              key={index}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
