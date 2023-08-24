import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    allData: [],
  },
  reducers: {
    addData: (state, action) => {
      state.allData = action.payload;
    },
  },
});

export const { addData } = dataSlice.actions;

export default dataSlice.reducer;
