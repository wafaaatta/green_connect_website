import { combineReducers } from '@reduxjs/toolkit';
import notification_store from './stores/notification_store';
import article_store from './stores/article_store';
import announce_store from './stores/announce_store';
import conversation_store from './stores/conversation_store';

const rootReducer = combineReducers({
    notification_store: notification_store,
    article_store: article_store,
    announce_store: announce_store,
    conversation_store: conversation_store
});

export default rootReducer;
