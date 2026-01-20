import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./paymentSlice";
import settingsReducer from "./settingsSlice";

export const store = configureStore({
  reducer: {
    payment: paymentReducer,
    settings: settingsReducer,
  },
});

// Type helpers for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
