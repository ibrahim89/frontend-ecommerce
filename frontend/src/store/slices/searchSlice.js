import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  selectedCategory: "all", // Default to "all" categories
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSearchQuery,setSelectedCategory } = searchSlice.actions;
export default searchSlice.reducer;
