import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main className="flex flex-col w-full  h-full items-center justify-start gap-6 md:gap-12 pt-40 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
      <div className="h-1/2 w-full -left-32 fixed top-32 bg-gradient-to-t transition from-purple-500  to-sky-500 -z-10 blur-3xl	opacity-30 dark:opacity-0" />
      <div className="h-full w-full fixed top-1/2 bg-gradient-to-r transition from-purple-500  to-sky-500 -z-10 blur-3xl	opacity-50 dark:opacity-20" />
      <div className="font-bold text-5xl md:text-9xl bg-gradient-to-r  from-purple-500  to-sky-500 text-transparent bg-clip-text">
        AiFormBuilder
      </div>
      <div>
        <h1 className="text-xl mx-2 md:text-5xl text-primary font-semibold">
          Effortlessly Craft Tailored Forms and Share Instantly.
        </h1>
      </div>
      <div>
        <h2 className="text-sm md:text-xl font-semibold text-foreground mx-2">
          Generate, Share, and Collect Responses Seamlessly with Our AI-Powered
          Form Building Platform.
        </h2>
      </div>
      <div className="flex gap-4">
        <SignedOut>
          <Button size={"lg"} asChild className="shadow-md" variant={"outline"}>
            <Link href="/demo">See Demo</Link>
          </Button>
        </SignedOut>

        <Button size={"lg"} asChild className="shadow-md">
          <Link href="/dashboard">
            <SignedIn>Go To the Dashboard</SignedIn>
            <SignedOut>Use for Free</SignedOut>
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default Home;
