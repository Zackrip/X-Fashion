import { createSlice } from "@reduxjs/toolkit";

const loadOrders = () => {
  try {
    const data = localStorage.getItem("orders");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: loadOrders(),
  },
  reducers: {

    addOrder: (state, action) => {
      state.orders.unshift(action.payload); // newest first
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem("orders");
    }

  }
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;