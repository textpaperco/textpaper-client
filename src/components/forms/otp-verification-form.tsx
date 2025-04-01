"use client";
import type React from "react";
import { Card } from "../ui/card";
import { Form, FormField, FormItem, FormControl } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../ui/input-otp";
import { Button } from "../ui/button";
import {
  useAuthenticateMutation,
  useVerifyMutation,
} from "@/lib/api/auth";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { APIErrorResponse } from "@/lib/api";
import { toast } from "sonner";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { formatPhoneNumberIntl } from "react-phone-number-input";

const formSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Code must be 6 characters long." })
    .regex(/^\d+$/, { message: "Code must only contain numbers." }),
  method_id: z.string(),
  phone_number: z.string(),
});

export default function OTPVerificationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(20);
  const [apiError, setApiError] = useState("");
  const method_id = searchParams.get("method_id");
  const phone_number = searchParams.get("phone_number");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      method_id: method_id || "",
      phone_number: phone_number || "",
    },
  });
  const [verify, { data, isLoading, isError, error }] =
    useVerifyMutation();

  const [
    authenticate,
    {
      data: authData,
      isLoading: isAuthLoading,
      isError: isAuthError,
      error: authError,
    },
  ] = useAuthenticateMutation();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      if (data.status === 200) {
        router.push("/app/dashboard");
      } else if (data.status === 201) {
        router.push("/app/welcome");
      }
    }
    if (isError && error) {
      console.log(error);
      if ("status" in error) {
        const { status, data } = error;
        if (typeof status === "number") {
          if (status < 500) {
            const apiError = data as APIErrorResponse;
            setApiError(apiError.message);
          }
        }
        setApiError("Something went wrong.");
      }
    }
  }, [data, error, isError, isLoading, router]);

  useEffect(() => {
    if (!isAuthLoading && !isAuthError && authData) {
      setCountdown(20);
      toast.success(
        `Code sent to ${formatPhoneNumberIntl(phone_number!)}`,
        {
          duration: 3000,
        },
      );
    }
    if (isAuthError && authError) {
      console.log(authError);
      if ("status" in authError) {
        const { status, data } = authError;
        if (typeof status === "number") {
          if (status < 500) {
            const apiError = data as APIErrorResponse;
            setApiError(apiError.message);
          }
        }
        setApiError("Something went wrong.");
      }
    }
  }, [
    authData,
    authError,
    isAuthError,
    isAuthLoading,
    isLoading,
    phone_number,
  ]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { code, method_id, phone_number } = values;
    await verify({ code, method_id, phone_number });
  };
  const onResend = async (phone_number: string) => {
    await authenticate({ phone_number });
  };

  if (!method_id || !phone_number) {
    return (
      <Card className="p-6">
        <p className="text-red-500">Invalid verification link.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      {apiError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code sent to
            </p>
            <p className="font-medium">
              {formatPhoneNumberIntl(phone_number)}
            </p>
          </div>

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    containerClassName="w-full justify-center">
                    <InputOTPGroup>
                      {new Array(6).fill(null).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="sm:size-12 size-9"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isLoading ? (
              <>
                <Loader />
                Verifying
              </>
            ) : (
              "Verify"
            )}
          </Button>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Didn&apos;t receive a code?{" "}
              {countdown > 0 ? (
                <span>Resend in {countdown}s</span>
              ) : (
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => onResend(phone_number!)}>
                  {isAuthLoading ? (
                    <>
                      <Loader />
                      Sending
                    </>
                  ) : (
                    "Resend"
                  )}
                </Button>
              )}
            </p>
          </div>

          <div className="text-center">
            <Button variant="link" asChild className="p-0 h-auto">
              <Link href="/auth">Use a different phone number</Link>
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
