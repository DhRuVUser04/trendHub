"use client";

import React from "react";
import MaxWidthWrapper from "../wrappers/MaxWidthWrapper";
import { TbMenu } from "react-icons/tb";
import { Button } from "../ui/button";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline, IoPersonOutline } from "react-icons/io5";
import { AiFillDribbbleCircle } from "react-icons/ai";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <header>
        <MaxWidthWrapper>
          <div className="flex justify-between relative items-center h-20">
            <Link href={"/"} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-3xl">
                <AiFillDribbbleCircle />
              </div>
              <h2 className="text-2xl font-semibold">
                Trend <span>Hub</span>
              </h2>
            </Link>
            <div className="lg:absolute lg:left-1/2 transform lg:-translate-x-1/2">
              <Button
                variant={"secondary"}
                size={"icon"}
                onClick={() => setOpen(true)}
                className="rounded-full text-xl w-10 h-10"
              >
                <TbMenu />
              </Button>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <Button size={"icon"} variant={"ghost"}>
                <IoIosSearch className="text-2xl" />
              </Button>
              <Button size={"icon"} variant={"ghost"}>
                <IoCartOutline className="text-2xl" />
              </Button>
              <Button size={"icon"} variant={"ghost"}>
                <IoPersonOutline className="text-2xl" />
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
