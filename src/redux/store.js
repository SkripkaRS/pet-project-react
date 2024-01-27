import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import counterReducer from "./slices/counterSlice";
import cartReducer from "./slices/cartSlice";
import menuReducer from "./slices/menuSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    cart: cartReducer,
    menu: menuReducer,
  },
});
