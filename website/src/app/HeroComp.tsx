/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import Image from "next/image";
import React from "react";

export default function HeroComp() {
  return (
    <div className="">
      <MaxWidthWrapper>
        <div className="rounded-lg w-full bg-neutral-200 flex justify-between items-center px-6 lg:py-10 lg:px-10">
          <div className="py-6 flex flex-col">
            <h4 className="text-sm lg:text-base text-blue-700 font-medium mb-0.5 lg:mb-1">
              - Hoodie Collection
            </h4>
            <h2 className="text-xl font-bold lg:text-4xl lg:font-semibold mb-3 lg:mb-4">
              We offer the Best
              <br />
              Hoodies For You
            </h2>
            <Button className="rounded-full w-fit lg:h-10 lg:px-4 lg:text-base text-sm">
              Shop Now
            </Button>
          </div>
          <div className="lg:h-[15rem] lg:w-96 w-1/2 h-full relative ">
            <Image
              src={"/assets/hero/women.png"}
              alt="hero_img"
              width={800}
              height={800}
              className="object-contain drop-shadow-lg h-full w-full brightness-110"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
