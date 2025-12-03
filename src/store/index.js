import { configureStore } from "@reduxjs/toolkit";
import laptopReducer from "./laptopSlice";

export const store = configureStore({
  reducer: {
    laptop: laptopReducer,
  },
});
