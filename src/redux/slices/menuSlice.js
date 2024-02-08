import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_MENU_API } from "../../constants";

const initialState = {
  menuItems: [],
  isLoading: false,
  isError: false,
};

const getMenuItems = createAsyncThunk("menu/getMenuItems", async () => {
  try {
    const response = await fetch(GET_MENU_API);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const { data } = await response.json();
    return data;
  } catch (e) {
    console.error("error", e.message);
  }
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMenuItems.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getMenuItems.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(getMenuItems.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.menuItems = payload;
    });
  },
});

export { getMenuItems };

export default menuSlice.reducer;
