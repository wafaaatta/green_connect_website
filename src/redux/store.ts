import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './root_reducer';

const persistConfig = {
    key: 'root',
    storage,
    // Add any other configuration options as needed
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);




export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    preloadedState
  })
}
export { store, persistor };
export type AppStore = ReturnType<typeof setupStore>