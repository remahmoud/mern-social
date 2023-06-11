import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addComment, setPost, setPostList } from "app/slices/postSlice";

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
        prepareHeaders: (headers, { getState, endpoint }) => {
            const user = getState().auth.user;

            if (user) {
                headers.set("Authorization", `Bearer ${user.token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Post"],
    endpoints: (builder) => ({
        addNewPost: builder.mutation({
            query: (data) => ({
                url: "/api/post/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Post"],
        }),
        removePost: builder.mutation({
            query: (id) => ({
                url: `/api/post/remove/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post"],
        }),
        addNewComment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/comment/${id}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Post"],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data.comment) {
                        dispatch(addComment(data.comment));
                    }
                } catch (err) {}
            },
        }),
        likePost: builder.mutation({
            query: (id) => ({
                url: `/api/post/like/${id}`,
                method: "POST",
                body: {},
            }),
            invalidatesTags: ["Post"],
        }),
        unlikePost: builder.mutation({
            query: (id) => ({
                url: `/api/post/unlike/${id}`,
                method: "POST",
                body: {},
            }),
            invalidatesTags: ["Post"],
        }),
        getPosts: builder.query({
            query: () => "/api/post/all",
            providesTags: ["Post"],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setPostList(data));
                } catch (err) {}
            },
        }),
        getSinglePost: builder.query({
            query: (id) => `/api/post/${id}`,
            providesTags: ["Post"],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setPost(data.post));
                } catch (err) {}
            },
        }),
    }),
});

export const {
    useAddNewPostMutation,
    useRemovePostMutation,
    useAddNewCommentMutation,
    useLikePostMutation,
    useUnlikePostMutation,
    useGetPostsQuery,
    useGetSinglePostQuery,
} = postApi;
