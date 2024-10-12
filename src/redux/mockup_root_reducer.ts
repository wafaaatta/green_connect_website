import { combineReducers } from '@reduxjs/toolkit';
import mockup_auth_store from './mockup_stores/mockup_auth_store'
import mockup_notification_store from './mockup_stores/mockup_notification_store'

const mockupRootReducer = combineReducers({
    auth_store: mockup_auth_store,
    notification_store: mockup_notification_store
});

export default mockupRootReducer;
