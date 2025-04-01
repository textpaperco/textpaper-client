import { LoaderCircle } from "lucide-react";

export default function FullPageLoading() {
  return (
    <div
      role="status"
      className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <LoaderCircle className="animate-spin size-12" />
      </div>
    </div>
  );
}
