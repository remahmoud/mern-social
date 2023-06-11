import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    setAnotherUser,
    setRecommended,
    setTopUsers,
    updateUser,
} from "app/slices/authSlice";
import { postApi } from "./post";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
        prepareHeaders: (headers, { getState, endpoint }) => {
            const user = getState().auth.user;
            const routes = ["login", "register"];

            if (user && !routes.includes(endpoint)) {
                headers.set("Authorization", `Bearer ${user.token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: "/api/auth/login",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["Auth"],
        }),
        register: builder.mutation({
            query: (user) => ({
                url: "/api/auth/register",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["Auth"],
        }),
        follow: builder.mutation({
            query: (id) => ({
                url: `/api/user/follow/${id}`,
                method: "POST",
                body: {},
            }),
            invalidatesTags: ["Auth"],
            async onQueryStarted(id, { dispatch }) {
                try {
                    dispatch(postApi.util.invalidateTags(["Post"]));
                } catch (err) {}
            },
        }),
        unfollow: builder.mutation({
            query: (id) => ({
                url: `/api/user/unfollow/${id}`,
                method: "POST",
                body: {},
            }),
            invalidatesTags: ["Auth"],
        }),
        updateAvatar: builder.mutation({
            query: (data) => ({
                url: "/api/user/avatar",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateUser(data));
                } catch (err) {}
            },
        }),
        getUser: builder.query({
            query: (id) => `/api/user/${id}`,
            providesTags: ["Auth"],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAnotherUser(data));
                } catch (err) {}
            },
        }),
        getProfile: builder.query({
            query: () => "/api/user/profile",
            providesTags: ["Auth"],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateUser(data));
                } catch (err) {}
            },
        }),
        recommendedUsers: builder.query({
            query: () => "/api/user/recommended",
            providesTags: ["Auth"],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setRecommended(data));
                } catch (err) {}
            },
        }),
        topUsers: builder.query({
            query: () => "/api/user/top",
            providesTags: ["Auth", "Post"],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setTopUsers(data));
                } catch (err) {}
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useUpdateAvatarMutation,
    useFollowMutation,
    useUnfollowMutation,
    useGetUserQuery,
    useGetProfileQuery,
    useRecommendedUsersQuery,
    useTopUsersQuery,
} = authApi;
