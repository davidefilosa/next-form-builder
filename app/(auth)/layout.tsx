import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-ful bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ModeToggle />
        </div>
      </nav>
      <main className="flex w-full flex-grow h-full items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
