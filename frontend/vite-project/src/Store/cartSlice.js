import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                item => item.productId === action.payload.productId);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push({...action.payload , quantity: 1});
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                item => item.productId !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});


export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;