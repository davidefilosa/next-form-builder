import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

const SubmitLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <ModeToggle />
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
};

export default SubmitLayout;
