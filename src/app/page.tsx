import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MessagesSquare,
  MessageSquare,
  Newspaper,
  Mail,
  Calendar,
  ChevronRight,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ComingSoon from "@/components/pages/coming-soon";

const features = [
  {
    title: "Interactive Q&A",
    description:
      "Ask questions about any news story and get detailed answers via SMS.",
    icon: <MessagesSquare className="h-5 w-5" />,
  },
  {
    title: "Personalized Digest",
    description:
      "Receive news tailored to your interests and reading preferences.",
    icon: <Newspaper className="h-5 w-5" />,
  },
  {
    title: "Custom Scheduling",
    description:
      "Choose when you want to receive news updates—morning, evening, or anything in between.",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Source Citations",
    description:
      "Every story includes a link to the original article for more context.",
    icon: <ArrowRight className="h-5 w-5" />,
  },
  {
    title: "Topic Filtering",
    description: "Choose which news categories matter most to you.",
    icon: <Mail className="h-5 w-5" />,
  },
  {
    title: "Text-Based Interface",
    description:
      "No apps to download or websites to visit—everything happens via SMS.",
    icon: <MessageSquare className="h-5 w-5" />,
  },
];

const steps = [
  {
    title: "Sign Up",
    description:
      "Join the waitlist and be among the first to get access when we launch.",
  },
  {
    title: "Receive News",
    description:
      "Get personalized news delivered directly to your phone via SMS.",
  },
  {
    title: "Interact",
    description:
      "Ask questions, request more information, or dive deeper into stories that interest you.",
  },
];
export default function Home() {
  if (process.env.NODE_ENV === "production") {
    return <ComingSoon />;
  }
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <Image
              src="/textpaper-logo.svg"
              alt=""
              width={100}
              height={100}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold tracking-tight">
              Textpaper
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div>
            <Button asChild>
              <Link href="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                  Smart news alerts—tailored for you, no apps needed.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Personalized news, delivered via SMS. No apps, no
                  clutter. Stay informed and ask questions to dig
                  deeper.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/auth">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Image
                src="https://placehold.co/400x600?text=iPhone+Demo%5CnPlaceholder"
                width={400}
                height={600}
                alt="Placeholder for iPhone demo of the service"
              />
            </div>
          </div>
        </section>

        <hr className="w-full bg-border" />
        <section
          className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32"
          id="features">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-serif text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              News that adapts to you
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Textpaper delivers personalized news via SMS with
              interactive features that let you engage with stories
              that matter to you.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-12">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  {feature.icon}
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="bg-muted py-12 md:py-24 lg:py-32"
          id="how-it-works">
          <div className="container max-w-6xl mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-serif text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                How Textpaper Works
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Getting started with Textpaper is simple. Sign up,
                receive news, and interact—all via SMS.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl items-start gap-6 md:grid-cols-3 lg:gap-12">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="group relative flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background text-lg font-bold">
                    {index + 1}
                  </div>
                  <div className="mt-4 space-y-2 text-center">
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="absolute -right-8 top-6 hidden h-6 w-6 text-muted-foreground/30 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32 border-t"
          id="pricing">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-serif text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Start with our free tier and upgrade as your needs grow.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-12 mt-12">
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="font-bold text-xl">Basic</h3>
                <p className="text-muted-foreground">
                  Perfect for casual news readers
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <div className="text-3xl font-bold">
                  $4.99
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Billed monthly
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  Daily news digest (morning & evening)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />5 interactive questions
                  per day
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />3 topic categories
                </li>
              </ul>
              <Button className="mt-6" variant="outline" asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="font-bold text-xl">Premium</h3>
                <p className="text-muted-foreground">
                  For news enthusiasts who want more
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <div className="text-3xl font-bold">
                  $9.99
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Billed monthly
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  All Basic features
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  Breaking news alerts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  Unlimited interactive questions
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  10 topic categories
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  Weekly in-depth analysis
                </li>
              </ul>
              <Button className="mt-6" asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          className="bg-muted py-12 md:py-24 lg:py-32"
          id="signup">
          <div className="container max-w-6xl mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-serif text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Ready to experience Textpaper?
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Sign up now and start receiving interactive news via
                SMS.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container max-w-6xl mx-auto py-12 md:py-24 lg:py-32 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="flex flex-col justify-center space-y-4">
              <blockquote className="text-xl font-serif italic">
                &quot;I hate having to download an app and then
                remember to check that app for my news updates.
                Getting it delivered right to my number is a
                game-changer.&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <Image
                  src="https://placehold.co/40x40"
                  alt="Jane Smith"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">
                    Software Engineer, Google
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <blockquote className="text-xl font-serif italic">
                &quot;Textpaper is revolutionizing how I consume news.
                It&apos;s like having a personal AI journalist in your
                pocket.&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <Image
                  src="https://placehold.co/40x40"
                  alt="Jane Smith"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">Jane Smith</div>
                  <div className="text-sm text-muted-foreground">
                    Product Manager, Meta
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container max-w-6xl mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/textpaper-logo.svg"
              alt=""
              width={100}
              height={100}
              className="size-6"
            />
            <p className="text-sm font-medium">
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
    </div>
  );
}
