import { api } from ".";
import type { APIResponse } from ".";
import type { User } from "./user";

export type AuthRequest = {
  phone_number: string;
};

export type AuthResponse = {
  method_id: string;
  phone_number: string;
};

export type VerifyRequest = {
  method_id: string;
  phone_number: string;
  code: string;
};

export const authApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    authenticate: build.mutation<
      APIResponse<AuthResponse>,
      AuthRequest
    >({
      query(body) {
        return {
          url: "/auth",
          method: "POST",
          body,
        };
      },
    }),
    verify: build.mutation<APIResponse<User>, VerifyRequest>({
      query(body) {
        return {
          url: "/auth/verify",
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["User"],
    }),
    logout: build.mutation({
      query() {
        return {
          url: "/auth/logout",
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useAuthenticateMutation,
  useVerifyMutation,
  useLogoutMutation,
} = authApi;
