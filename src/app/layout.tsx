import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer, Navbar, ThemeProvider } from "@components/index";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Mohammad Farhadi",
    default: "Mohammad Farhadi",
  },
  description: "Check out my smart portfolio website with a custom AI chatbot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider 
          attribute='class'
          defaultTheme='system'
          enableSystem
        >
        <Navbar/>
        <main className="mx-auto max-w-3xl px-3 py-10">{children}</main>
        <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
