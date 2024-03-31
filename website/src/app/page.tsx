import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import Image from "next/image";
import HeroComp from "./HeroComp";

export default function Home() {
  return (
    <main className="flex flex-col lg:gap-8 gap-4 h-full w-full py-3 lg:py-6">
      <HeroComp />
    </main>
  );
}
