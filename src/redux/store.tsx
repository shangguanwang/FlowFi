import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import assetsReducer from "./assetsSlice";
import debtReducer from "./debtSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        assets: assetsReducer,
        debt: debtReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;