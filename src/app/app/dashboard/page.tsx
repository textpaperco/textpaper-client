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
          <p>Phone Number: {data.payload.phoneNumber}</p>
          <p>First Name: {data.payload.firstName}</p>
          <p>Last Name: {data.payload.lastName}</p>
          <p>
            News Preferences:{" "}
            {data.payload.newsPreferences?.join(", ")}
          </p>
          <p>Frequency: {data.payload.frequency}</p>
          <p>Create Time: {data.payload.createTime}</p>
          <p>Update Time: {data.payload.updateTime}</p>
        </div>
      )}
      <Button onClick={() => logout()}>
        {isLogoutLoading ? "Logging out..." : "Logout"}
      </Button>
      {isLogoutError && <p>Error logging out</p>}
    </div>
  );
}
