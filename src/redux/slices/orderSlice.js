import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_ORDER_API } from "../../constants";

const initialState = {
  order: null,
  isLoading: false,
  isError: false,
};

const createOrder = createAsyncThunk("order/createOrder", async (createdOrderData) => {
  try {
    const response = await fetch(CREATE_ORDER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdOrderData),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const { data } = await response.json();
    return data;
  } catch (e) {
    console.error("error", e.message);
  }
});

const updateOrder = createAsyncThunk("order/updateOrder", async (updatedOrderData) => {
  try {
    const response = await fetch(CREATE_ORDER_API, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrderData),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const { data } = await response.json();
    return data;
  } catch (e) {
    console.error("error", e.message);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.order = payload;
    });
    builder.addCase(updateOrder.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.order = payload;
    });
  },
});

export { createOrder, updateOrder };

export default orderSlice.reducer;
