import { configureStore } from "@reduxjs/toolkit";
import apiKeyReducer from "./apiKeySlice";

export const store = configureStore({
  reducer: {
    apiKeys: apiKeyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
