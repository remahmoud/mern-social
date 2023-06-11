import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    item: null,
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPostList: (state, { payload }) => {
            return { ...state, list: payload };
        },
        createPost: (state, { payload }) => {
            return { ...state, list: [payload, ...state.list] };
        },
        setPost: (state, { payload }) => {
            return { ...state, item: payload };
        },
        deletePost: (state, { payload }) => {
            return { ...state, item: null };
        },
        deletePostFromList: (state, { payload }) => {
            return {
                ...state,
                list: state.list.filter((item) => item._id !== payload),
            };
        },
        addComment: (state, { payload }) => {
            return {
                ...state,
                item: {
                    ...state.item,
                    comments: [payload, ...state.item.comments],
                },
            };
        },
    },
});

export const {
    setPostList,
    createPost,
    setPost,
    deletePost,
    deletePostFromList,
    addComment,
} = postSlice.actions;

export default postSlice;
