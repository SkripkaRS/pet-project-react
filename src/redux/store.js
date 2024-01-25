import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import counterReducer from "./slices/counterSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    cart: cartReducer,
  },
});
