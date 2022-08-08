import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/uiSlice';
import Notification from './components/UI/Notification';

let isInitialPageLoad = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );

      const response = await fetch(
        'https://react-http-4bc80-default-rtdb.firebaseio.com/redux-store-cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed!');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Cart data sent successfully!',
        })
      );
    };

    if (isInitialPageLoad) {
      isInitialPageLoad = false;
      return;
    }

    sendCartData()
      .then((empty) => {
        setTimeout(() => {
          dispatch(uiActions.hideNotification());
        }, 1000);
      })
      .catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: error.message,
          })
        );
      });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
