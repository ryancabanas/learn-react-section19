import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/uiSlice';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cartActions';

let isInitialPageLoad = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitialPageLoad) {
      isInitialPageLoad = false;
      return;
    }

    if (cart.cartChanged) {
      /* Main dispatch approach, but no promises to work with. */
      // dispatch(sendCartData(cart));

      /* Alternative way to dispatch custom action creator function, which gives us a promise.  */
      sendCartData(cart)(dispatch).then((empty) => {
        setTimeout(() => {
          dispatch(uiActions.hideNotification());
        }, 1000);
      });
    }
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
