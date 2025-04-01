"use client";
import { createContext, useEffect, useState } from "react";
import { useGetUserQuery, type User } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FullPageLoading from "@/components/pages/full-page-loading";

export interface AuthContextType {
  user: User;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export type AuthContextProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthContextProviderProps) {
  const { data, isLoading, isError, error } = useGetUserQuery();
  const [context, setContext] = useState<AuthContextType | undefined>(
    undefined,
  );
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !isError && data) {
      setContext({ user: data.payload });
    }

    if (isError && error) {
      setContext(undefined);
      router.push("/auth");
      toast.info("Session expired. Please log in again.", {
        position: "bottom-center",
      });
    }
  }, [data, error, isError, isLoading, router]);

  if (isLoading || !context) {
    return <FullPageLoading />;
  }
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
}
