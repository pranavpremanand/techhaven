import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import cartSlice from "./features/cartSlice";
import loaderSlice from "./features/loaderSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    loader:loaderSlice
  },
});