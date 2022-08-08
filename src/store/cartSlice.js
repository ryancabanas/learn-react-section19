import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  isVisible: false,
  cartItems: [],
  totalItemQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    toggleVisibility: (state) => {
      state.isvisible = !state.isVisible;
    },
    addItem: (state, action) => {
      const { id, title, price, description } = action.payload;
      const existingCartItem = state.cartItems.find((item) => {
        return item.id === id;
      });

      if (existingCartItem) {
        state.cartItems.push({
          id,
          title,
          description,
          price,
          quantity: 1,
          total: price,
        });
      } else {
        existingCartItem.quantity = existingCartItem.quantity + 1;
        existingCartItem.total =
          existingCartItem.total + existingCartItem.price;
      }

      state.totalItemQuantity++;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
