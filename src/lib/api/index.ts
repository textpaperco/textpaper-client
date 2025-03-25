import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import env from "@/util/env";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${env.serverUrl}/api/` }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});
