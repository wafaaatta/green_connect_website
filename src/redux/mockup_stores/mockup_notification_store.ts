// src/redux/stores/notification_store.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  description: '',
  visible: false,
  type: 'info', // Default type
};

const mockupNotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.description = action.payload.description || '';
      state.type = action.payload.type || 'info';
      state.visible = true;
    },
    hideNotification: (state) => {
      state.visible = false;
    },
  },
});

export const { showNotification, hideNotification } = mockupNotificationSlice.actions;
export default mockupNotificationSlice.reducer;
