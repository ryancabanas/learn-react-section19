import { uiActions } from './uiSlice';

export const fetchUIData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-4bc80-default-rtdb.firebaseio.com/redux-store-ui.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch UI data!');
      }

      const data = await response.json();
      return data;
    };

    try {
      const uiData = await fetchData();
      dispatch(
        uiActions.replaceUI({
          cartIsVisible: uiData?.cartIsVisible || false,
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

export const sendUIData = (data) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-4bc80-default-rtdb.firebaseio.com/redux-store-ui.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            cartIsVisible: data.cartIsVisible,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending UI data failed!');
      }
    };

    try {
      await sendRequest();
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
