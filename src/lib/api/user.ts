import { api } from ".";

export type User = {
  id: string;
  phone_number: string;
  first_name?: string;
  last_name?: string;
  news_preferences?: string[];
  frequency?: string;
  create_time: string;
  update_time: string;
};

export type UpdateUser = Omit<
  User,
  "id" | "create_time" | "update_time"
>;

export const userApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getUser: build.query<User, void>({
      query() {
        return {
          url: "/user",
          method: "GET",
        };
      },
    }),
    updateUser: build.mutation<User, UpdateUser>({
      query(body) {
        return {
          url: "/user",
          method: "PUT",
          body,
        };
      },
    }),
    deleteUser: build.mutation<User, void>({
      query() {
        return {
          url: "/user",
          method: "DELETE",
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
