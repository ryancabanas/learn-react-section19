import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  cartItems: [],
  totalItemQuantity: 0,
  cartChanged: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalItemQuantity = action.payload.totalItemQuantity;
      state.cartItems = action.payload.cartItems;
    },
    addItemToCart: (state, action) => {
      const { id, title, price, description } = action.payload;
      const existingCartItem = state.cartItems.find((item) => item.id === id);

      if (!existingCartItem) {
        state.cartItems.push({
          id,
          title,
          description,
          price,
          quantity: 1,
          total: price,
        });
      } else {
        existingCartItem.quantity++;
        existingCartItem.total = existingCartItem.total + price;
      }

      state.totalItemQuantity++;
      state.cartChanged = true;
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingCartItem = state.cartItems.find((item) => item.id === id);

      if (existingCartItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingCartItem.quantity--;
        existingCartItem.total =
          existingCartItem.total - existingCartItem.price;
      }

      state.totalItemQuantity--;
      state.cartChanged = true;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
