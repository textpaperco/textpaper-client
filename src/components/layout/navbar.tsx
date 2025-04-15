import Link from "next/link";
import { Button } from "@/components/ui/button";
import Wordmark from "@/components/svg/textpaper-wordmark.svg";

export interface NavbarItem {
  label: React.ReactNode;
  href: string;
}

const items: NavbarItem[] = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "How It Works",
    href: "#how-it-works",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4 max-w-6xl mx-auto">
        <Link href="/">
          <Wordmark className="h-9 w-auto" />
        </Link>
        <nav className="hidden md:flex gap-6">
          {items.map((item, idx) => {
            return (
              <Link
                key={`nav-item-${idx}`}
                className="text-sm font-semibold transition-colors hover:text-primary"
                href={item.href}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div>
          <Button asChild className="font-bold">
            <Link href="/auth">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
