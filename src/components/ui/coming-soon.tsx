"use client";
import NotifyForm from "./notify-form";

export default function ComingSoon() {
  return (
    <div className="flex flex-col justify-center min-h-screen max-w-6xl mx-auto space-y-4 px-4">
      <div className="inline-flex w-fit items-center rounded-full border bg-muted px-4 py-1 text-sm font-medium">
        <span className="block h-2 w-2 rounded-full bg-primary mr-2"></span>
        Coming Soon
      </div>
      <h1 className="text-3xl max-w-4xl font-serif font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
        Smart news alerts—tailored for you, no apps needed.
      </h1>
      <p className="text-muted-foreground md:text-xl">
        Personalized news, delivered via SMS. No apps, no clutter.
        Stay informed and ask questions to dig deeper.
      </p>
      <div className="max-w-md space-y-4 pt-4">
        <h3 className="text-lg font-medium">
          Be the first to know when we launch
        </h3>
        <NotifyForm />
        <p className="text-xs text-muted-foreground">
          We&apos;ll notify you when Textpaper launches. No spam, we
          promise.
        </p>
      </div>
    </div>
  );
}
