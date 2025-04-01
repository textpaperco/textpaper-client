"use client";
import { useGetUserQuery } from "@/lib/api/user";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/lib/api/auth";

export default function Dashboard() {
  const { data, isLoading, error } = useGetUserQuery();
  const [
    logout,
    { isLoading: isLogoutLoading, isError: isLogoutError },
  ] = useLogoutMutation();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      User dashboard
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {data && (
        <div>
          <p>User ID: {data.payload.id}</p>
          <p>Phone Number: {data.payload.phone_number}</p>
          <p>First Name: {data.payload.first_name}</p>
          <p>Last Name: {data.payload.last_name}</p>
          <p>
            News Preferences:{" "}
            {data.payload.news_preferences?.join(", ")}
          </p>
          <p>Frequency: {data.payload.frequency}</p>
          <p>Create Time: {data.payload.create_time}</p>
          <p>Update Time: {data.payload.update_time}</p>
        </div>
      )}
      <Button onClick={() => logout()}>
        {isLogoutLoading ? "Logging out..." : "Logout"}
      </Button>
      {isLogoutError && <p>Error logging out</p>}
    </div>
  );
}
