import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./queries/auth";
import { postApi } from "./queries/post";
import authSlice from "./slices/authSlice";
import postSlice from "./slices/postSlice";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        auth: authSlice.reducer,
        post: postSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(postApi.middleware),
});

export default store;
