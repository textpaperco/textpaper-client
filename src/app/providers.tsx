"use client";
import { store } from "@/lib/store";
import { Provider as ReduxProvider } from "react-redux";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
