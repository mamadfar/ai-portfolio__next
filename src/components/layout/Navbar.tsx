import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AIChatButton from "../ai/AIChatButton";
import { DownloadCloud } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-background sticky top-0">
      <div className="mx-auto flex max-w-3xl flex-wrap justify-between gap-3 px-3 py-4">
        <nav className="space-x-4 font-medium">
          <Link href="/">home</Link>
          <Link href="/about">about me</Link>
          <Link href="/social">social media</Link>
        </nav>
        <div className="flex items-center gap-4">
          <AIChatButton />
          <ThemeToggle />
          <a
            href="/Mohammad_Farhadi_Frontend_Resume.pdf"
            download
            className="inline-flex items-center gap-1 hover:underline"
            target="_self"
            rel="noopener noreferrer"
            aria-label="Download Resume"
          >
            <DownloadCloud className="h-5 w-5" />
            resume
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
