import { combineReducers } from '@reduxjs/toolkit';
import notification_store from './stores/notification_store';
import article_store from './stores/article_store';
import announce_store from './stores/announce_store';
import auth_store from './stores/auth_store';
import event_store from './stores/event_store';
import conversation_store from './stores/conversation_store';
import message_store from './stores/message_store';

const rootReducer = combineReducers({
    notification_store: notification_store,
    article_store: article_store,
    announce_store: announce_store,
    conversation_store: conversation_store,
    auth_store: auth_store,
    event_store: event_store,
    message_store: message_store
});

export default rootReducer;
