import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    allData: [],
    dataKeys: [],
    selectedServer: [],
    selectedRegion: [],
    selectedMethod: [],
  },
  reducers: {
    addData: (state, action) => {
      state.allData = action.payload;
    },
    addDataKeys: (state, action) => {
      state.dataKeys = action.payload;
    },
    setSelectedServer: (state, action) => {
      state.selectedServer = action.payload;
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },
    setSelectedMethod: (state, action) => {
      state.selectedMethod = action.payload;
    },
  },
});

export const {
  addData,
  addDataKeys,
  setSelectedServer,
  setSelectedRegion,
  setSelectedMethod,
} = dataSlice.actions;

export default dataSlice.reducer;
