import { createSlice } from '@reduxjs/toolkit';

const initialUIState = {
  cartIsVisible: false,
  notification: null,
  cartVisibilityChanged: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    toggleCartVisibility: (state) => {
      state.cartIsVisible = !state.cartIsVisible;
      state.cartVisibilityChanged = true;
    },
    showNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    hideNotification: (state) => {
      state.notification = null;
    },
    replaceUI: (state, action) => {
      state.cartIsVisible = action.payload.cartIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
