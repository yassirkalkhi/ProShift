import { configureStore} from "@reduxjs/toolkit";
import {authApi} from "../features/auth/authAPI"

export const store = configureStore({
    reducer: {
        [authApi.reducerPath] : authApi.reducer
    },
    middleware :  (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware);
      },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;