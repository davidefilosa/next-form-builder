import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import DesignerContextProvider from "@/components/context/designer-context";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Form Builder",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <DesignerContextProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <nav className="flex w-full items-center justify-between p-4 border-b">
                <Logo />
                <div className="flex gap-4 items-center">
                  <ModeToggle />
                  <UserButton afterSignOutUrl="/" />
                </div>
              </nav>
              {children}
              <Toaster />
            </ThemeProvider>
          </DesignerContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
