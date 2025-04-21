"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Loader } from "lucide-react";
import { PhoneInput } from "../ui/phone-number-input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useSendOTPMutation } from "@/lib/api/auth";
import { APIErrorResponse } from "@/lib/api";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

export default function PhoneAuthForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const [sendOTP, { data, isLoading, isError, error }] =
    useSendOTPMutation();

  const onSubmit = async ({
    phoneNumber,
  }: z.infer<typeof formSchema>) => {
    sendOTP({ phoneNumber });
  };

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const { methodId, phoneNumber } = data.payload;
      router.push(
        `/auth/verify?methodId=${encodeURIComponent(methodId)}&phoneNumber=${encodeURIComponent(phoneNumber)}`,
      );
    }
    if (isError && error) {
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
  }, [data, isError, error, isLoading, router]);

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
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="(416) 123 4567"
                    defaultCountry="CA"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="animate-spin" />
                Sending code
              </>
            ) : (
              "Continue"
            )}
          </Button>
          <p className="mt-2 text-xs text-center text-muted-foreground">
            We&apos;ll send a verification code to your phone. New to
            Textpaper? We&apos;ll create an account for you
            automatically.
          </p>
        </form>
      </Form>
    </Card>
  );
}
