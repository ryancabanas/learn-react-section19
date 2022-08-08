import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './uiSlice';

const initialCartState = {
  cartItems: [],
  totalItemQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
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
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-4bc80-default-rtdb.firebaseio.com/redux-store-cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed!');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Cart data sent successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message,
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
