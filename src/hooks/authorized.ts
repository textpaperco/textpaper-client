import { useGetUserQuery } from "@/lib/api/user";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface CookieValues {
  "textpaper-jwt": string;
}

interface UseIsAuthorizedResponse {
  isAuthorized: boolean;
  isLoading: boolean;
}

export function useIsAuthorized(): UseIsAuthorizedResponse {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const removeCookie = useCookies<"textpaper-jwt", CookieValues>([
    "textpaper-jwt",
  ])[2];
  const { data, isLoading, isError, error } = useGetUserQuery();

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setIsAuthorized(true);
    }

    if (isError && error) {
      if ("status" in error) {
        const { status } = error;
        if (typeof status === "number" && status === 401) {
          setIsAuthorized(false);
          removeCookie("textpaper-jwt");
        }
      }
    }
  }, [data, error, isError, isLoading, removeCookie]);

  return {
    isAuthorized,
    isLoading,
  };
}
