import { api } from ".";
import type { APIResponse } from ".";

export type User = {
  id: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  newsPreferences?: string[];
  frequency?: string;
  createTime: string;
  updateTime: string;
};

export type UpdateUserRequest = Omit<
  User,
  "id" | "createTime" | "updateTime"
>;

export const userApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getUser: build.query<APIResponse<User>, void>({
      query() {
        return {
          url: "/user",
          method: "GET",
          credentials: "include",
        };
      },
    }),
    updateUser: build.mutation<APIResponse<User>, UpdateUserRequest>({
      query(body) {
        return {
          url: "/user",
          method: "PUT",
          body,
          credentials: "include",
        };
      },
    }),
    deleteUser: build.mutation<APIResponse<User>, void>({
      query() {
        return {
          url: "/user",
          method: "DELETE",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
