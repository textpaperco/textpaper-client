import { api } from ".";
import type { APIResponse } from ".";

export type SendOTPRequest = {
  phoneNumber: string;
};

export type SendOTPResponse = {
  methodId: string;
  phoneNumber: string;
};

export type AuthenticateRequest = {
  methodId: string;
  phoneNumber: string;
  otp: string;
};

export type AuthenticateResponse = {
  newUser: boolean;
};

export const authApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    sendOTP: build.mutation<
      APIResponse<SendOTPResponse>,
      SendOTPRequest
    >({
      query(body) {
        return {
          url: "/auth/send-otp",
          method: "POST",
          body,
        };
      },
    }),
    authenticate: build.mutation<
      APIResponse<AuthenticateResponse>,
      AuthenticateRequest
    >({
      query(body) {
        return {
          url: "/auth/authenticate",
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["User"],
    }),
    logout: build.mutation<APIResponse<void>, void>({
      query() {
        return {
          url: "/auth/logout",
          method: "POST",
          credentials: "include",
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSendOTPMutation,
  useAuthenticateMutation,
  useLogoutMutation,
} = authApi;
