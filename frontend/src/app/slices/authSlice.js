import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
const initialState = {
    user,
    anotherUserInfo: null,
    recommended: null,
    topUsers: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addToken: (state, { payload }) => {
            state.user = { ...state.user, token: payload };
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        updateUser: (state, { payload }) => {
            state.user = { ...state.user, ...payload };
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        setAnotherUser: (state, { payload }) => {
            return { ...state, anotherUserInfo: payload };
        },
        setRecommended: (state, { payload }) => {
            return { ...state, recommended: payload };
        },
        setTopUsers: (state, { payload }) => {
            return { ...state, topUsers: payload };
        },
        removePostFromUserPosts: (state, { payload }) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    posts: state.user.posts.filter(
                        (post) => post._id !== payload
                    ),
                },
            };
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export const {
    addToken,
    updateUser,
    setAnotherUser,
    logout,
    setRecommended,
    setTopUsers,
    removePostFromUserPosts,
} = authSlice.actions;

export default authSlice;
