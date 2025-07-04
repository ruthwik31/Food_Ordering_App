import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      //state.items.push(action.payload);
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.card.info.id === item.card.info.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Add quantity = 1 for the first time
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      //state.items.pop(); //re-write
      const idToRemove = action.payload;
      const existingItemIndex = state.items.findIndex(
        (i) => i.card.info.id === idToRemove
      );

      if (existingItemIndex > -1) {
        const existingItem = state.items[existingItemIndex];
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    clearCart: (state, action) => {
      //state.items = [];
      //return {items:[]}
      state.items.length = 0;
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.card.info.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.card.info.id === id);
      if (index > -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1); // remove if quantity becomes 0
        }
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
