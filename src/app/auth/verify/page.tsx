"use client";
import Link from "next/link";
import Wordmark from "@/components/svg/textpaper-wordmark.svg";
import OTPVerificationForm from "@/components/forms/otp-verification-form";
import { Suspense } from "react";

export default function Verify() {
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
            Verify your phone number
          </h1>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a verification code to your phone number.
          </p>
        </div>
        {/* TODO: Make a proper loading skeleton for this */}
        <Suspense fallback={<p>Loading...</p>}>
          <OTPVerificationForm />
        </Suspense>
      </div>
    </div>
  );
}
