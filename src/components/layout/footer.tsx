import Link from "next/link";
import Logo from "@/components/svg/textpaper-logo.svg";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container max-w-6xl mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <Logo className="size-6" />
          <p className="text-sm font-bold tracking-tighter">
            Textpaper &copy; {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex gap-4 md:gap-6">
          <Link
            href="#"
            className="text-sm font-medium underline-offset-4 hover:underline">
            Terms
          </Link>
          <Link
            href="#"
            className="text-sm font-medium underline-offset-4 hover:underline">
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm font-medium underline-offset-4 hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
