import { createStore, compose, applyMiddleware } from 'redux';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import JSOG from 'jsog';
import reducers from './modules';

export const JSOGTransform = createTransform(
  inboundState => JSOG.encode(inboundState),
  outboundState => JSOG.decode(outboundState)
);

const persistConfig = {
  blacklist: [
    // Inject reducer to be excluded!
  ],
  key: 'root',
  storage,
  transforms: [JSOGTransform]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
