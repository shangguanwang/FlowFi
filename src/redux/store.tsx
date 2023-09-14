import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import assetsReducer from "./assetsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        assets: assetsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;