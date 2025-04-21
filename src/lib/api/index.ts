import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import env from "@/util/env";

export type APIResponse<T> = {
  message: string;
  payload: T;
};

export type APIErrorResponse = APIResponse<{ details?: string }>;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${env.serverUrl}/` }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});
