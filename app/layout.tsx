import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import DesignerContextProvider from "@/components/context/designer-context";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Form Builder",
  description:
    "! Our platform offers cutting-edge solutions for effortless form creation, distribution, and response collection. With our AI-powered technology, you can quickly generate customized forms tailored to your specific needs. Whether you're gathering feedback, organizing events, or conducting surveys, our intuitive interface makes it easy to create and share forms with your audience. Say goodbye to tedious manual form building and hello to streamlined data collection! Join thousands of satisfied users who have empowered their businesses with our platform. Try [Your Website Name] today and experience the future of form building!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(font.className, "scrollbar-none")}>
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
              <Analytics />
              <Toaster />
            </ThemeProvider>
          </DesignerContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
