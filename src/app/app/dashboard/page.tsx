"use client";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/lib/api/user";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/lib/api/auth";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-number-input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  firstName: z.string(),
  lastName: z.string(),
  newsPreferences: z.array(z.string()).optional(),
  frequency: z.string(),
});

export default function Dashboard() {
  const { data, isLoading, error } = useGetUserQuery();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      firstName: "",
      lastName: "",
      newsPreferences: [],
      frequency: "",
    },
  });

  const [
    logout,
    { isLoading: isLogoutLoading, isError: isLogoutError },
  ] = useLogoutMutation();
  const [updateUser, { isLoading: isUpdateLoading }] =
    useUpdateUserMutation();

  const onLogout = async () => {
    try {
      await logout().unwrap();
      router.push("/auth");
      toast.success("Logged out successfully", { duration: 2000 });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    updateUser(values);
  };

  useEffect(() => {
    if (!isLoading && !error && data) {
      form.reset({
        phoneNumber: data.payload.phoneNumber,
        firstName: data.payload.firstName,
        lastName: data.payload.lastName,
        newsPreferences: data.payload.newsPreferences,
        frequency: data.payload.frequency,
      });
    }
  }, [data, error, form, isLoading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      User dashboard
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {data && (
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div>
              <Label>News preferences</Label>
              <p>{data.payload.newsPreferences?.join(",")}</p>
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                onClick={onLogout}
                type="button"
                variant="secondary"
                disabled={isLogoutLoading}>
                {isLogoutLoading ? "Logging out..." : "Logout"}
              </Button>
              <Button
                type="submit"
                disabled={!form.formState.isDirty || isUpdateLoading}>
                {isUpdateLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      )}
      {isLogoutError && <p>Error logging out</p>}
    </div>
  );
}
