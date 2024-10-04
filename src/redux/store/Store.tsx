import { configureStore, applyMiddleware} from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice"
import mosqueSlice from "../slice/mosqueSlice";

const rootReducer = {
  auth: authReducer,
  mosque:mosqueSlice
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  
});

export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;