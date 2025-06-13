import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});

export default store;
