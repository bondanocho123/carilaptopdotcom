import { createSlice } from "@reduxjs/toolkit";

const laptopSlice = createSlice({
  name: "laptop",
  initialState: {
    lastFetched: [], // hasil API dari Results
  },
  reducers: {
    setLastFetched: (state, action) => {
      state.lastFetched = action.payload;
    },
    clearLastFetched: (state) => {
      state.lastFetched = [];
    },
  },
});

export const { setLastFetched, clearLastFetched } = laptopSlice.actions;
export default laptopSlice.reducer;
