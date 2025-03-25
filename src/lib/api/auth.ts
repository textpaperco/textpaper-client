import { api } from ".";
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
    authenticate: build.query<AuthResponse, AuthRequest>({
      query(body) {
        return {
          url: "/auth",
          method: "POST",
          body,
        };
      },
    }),
    verify: build.mutation<User, VerifyRequest>({
      query(body) {
        return {
          url: "/auth/verify",
          method: "POST",
          body,
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
  useAuthenticateQuery,
  useVerifyMutation,
  useLogoutMutation,
} = authApi;
