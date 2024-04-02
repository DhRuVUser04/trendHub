import Image from "next/image";
import React from "react";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full flex justify-center items-center bg-primary/70">
        <div className="w-96 h-96 relative">
          <Image
            src="/assets/hero/women.png"
            alt="hero_img"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center bg-primary/10 py-12 px-36">
        {children}
      </div>
    </div>
  );
}
