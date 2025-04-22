"use client";
import Link from "next/link";
import Wordmark from "@/components/svg/textpaper-wordmark.svg";
import PhoneAuthForm from "@/components/forms/phone-auth-form";
import { useIsAuthorized } from "@/hooks/authorized";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FullPageLoading from "@/components/pages/full-page-loading";

export default function AuthPage() {
  const { isAuthorized, isLoading } = useIsAuthorized();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthorized) {
      router.replace("/app/dashboard");
    }
  }, [isAuthorized, isLoading, router]);

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <div className="max-w-6xl mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Wordmark className="h-9 w-auto" />
      </Link>
      <div className="flex flex-col justify-center space-y-6 sm:w-[350px] w-full">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Continue to Textpaper
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your phone number to sign in or create an account
          </p>
        </div>
        <PhoneAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
