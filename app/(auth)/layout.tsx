import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-ful bg-background max-h-screen">
      <main className="flex w-full flex-grow h-full items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
