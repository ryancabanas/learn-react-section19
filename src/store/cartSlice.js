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
      console.log(existingCartItem);
      let newCartItem;

      if (existingCartItem) {
        const {
          quantity: currentQuantity,
          total: currentTotal,
          price,
        } = existingCartItem;

        newCartItem = {
          ...existingCartItem,
          quantity: currentQuantity + 1,
          total: currentTotal + price,
        };
      } else {
        newCartItem = {
          id,
          title,
          description,
          price,
          quantity: 1,
          total: price,
        };
      }
      const newCartItems = [...state.cartItems, newCartItem];
      state.cartItems = newCartItems;
      state.totalItemQuantity++;
      console.log(state.cartItems);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
