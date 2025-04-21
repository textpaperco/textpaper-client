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
  useSendOTPMutation,
  useAuthenticateMutation,
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
  otp: z
    .string()
    .min(6, { message: "Code must be 6 characters long." })
    .regex(/^\d+$/, { message: "Code must only contain numbers." }),
  methodId: z.string(),
  phoneNumber: z.string(),
});

export default function OTPVerificationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(20);
  const [apiError, setApiError] = useState("");
  const methodId = searchParams.get("methodId");
  const phoneNumber = searchParams.get("phoneNumber");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      methodId: methodId || "",
      phoneNumber: phoneNumber || "",
    },
  });
  const [authenticate, { data, isLoading, isError, error }] =
    useAuthenticateMutation();

  const [
    sendOTP,
    {
      data: sendOTPData,
      isLoading: isSendOTPLoading,
      isError: isSendOTPError,
      error: sendOTPError,
    },
  ] = useSendOTPMutation();

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
      if (data.payload.newUser) {
        router.push("/app/welcome");
      } else {
        router.push("/app/dashboard");
      }
    }
    if (isError && error) {
      console.error(error);
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
    if (!isSendOTPLoading && !isSendOTPError && sendOTPData) {
      setCountdown(20);
      toast.success(
        `Code sent to ${formatPhoneNumberIntl(phoneNumber!)}`,
        {
          duration: 3000,
        },
      );
    }
    if (isSendOTPError && sendOTPError) {
      console.error(sendOTPError);
      if ("status" in sendOTPError) {
        const { status, data } = sendOTPError;
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
    sendOTPData,
    sendOTPError,
    isSendOTPError,
    isSendOTPLoading,
    isLoading,
    phoneNumber,
  ]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { otp, methodId, phoneNumber } = values;
    await authenticate({ otp, methodId, phoneNumber });
  };
  const onResend = async (phoneNumber: string) => {
    await sendOTP({ phoneNumber });
  };

  if (!methodId || !phoneNumber) {
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
              {formatPhoneNumberIntl(phoneNumber)}
            </p>
          </div>

          <FormField
            control={form.control}
            name="otp"
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
                  onClick={() => onResend(phoneNumber!)}>
                  {isSendOTPLoading ? (
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
