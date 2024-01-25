import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const item = state.items.find((item) => item.id === payload.id);

      if (item) item.quantity += 1;
      else state.items.push({ ...payload, quantity: 1 });
    },
    removeItem: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload);
    },
    clearCart: (state, action) => {
      state.items = [];
    },
    incrementQuantity: (state, { payload }) => {
      const item = state.items.find((item) => item.id === payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, { payload }) => {
      const item = state.items.find((item) => item.id === payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
