"use client";
import { store } from "@/lib/store";
import { Provider as ReduxProvider } from "react-redux";
import { CookiesProvider } from "react-cookie";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider store={store}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        {children}
      </CookiesProvider>
    </ReduxProvider>
  );
}
