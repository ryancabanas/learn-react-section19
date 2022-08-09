import { uiActions } from './uiSlice';
import { cartActions } from './cartSlice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-4bc80-default-rtdb.firebaseio.com/redux-store-cart.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          cartItems: cartData.cartItems || [],
          totalItemQuantity: cartData.totalItemQuantity,
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
        {
          method: 'PUT',
          body: JSON.stringify({
            cartItems: cart.cartItems,
            totalItemQuantity: cart.totalItemQuantity,
          }),
        }
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
