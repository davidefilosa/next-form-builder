import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main className="flex flex-col w-screen h-screen items-center justify-start gap-8 pt-32">
      <div className="h-full w-72 fixed top-1/2 bg-gradient-to-r transition from-purple-500  to-sky-500 -z-10 blur-3xl	opacity-50" />
      <div className="font-bold text-9xl bg-gradient-to-r  from-purple-500  to-sky-500 text-transparent bg-clip-text">
        FormBuilder
      </div>
      <div>
        <h1 className="text-4xl text-primary">
          Empower Your Forms, Effortlessly.
        </h1>
      </div>
      <div>
        <h2 className="text-xl text-white">
          Create, Share, and Collect Responses with Our Intuitive Form Building
          Platform.
        </h2>
      </div>
      <div>
        <Button size={"lg"} asChild className="mt-18 text-white text-3xl py-8">
          <Link href="/dashboard">Start for free</Link>
        </Button>
      </div>
    </main>
  );
};

export default Home;
