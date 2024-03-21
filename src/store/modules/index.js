import { combineReducers } from 'redux';
import { baseReducers } from './base';

// Inject imported reducers here!

const reducers = combineReducers({
  // Inject reducers here!
  ...baseReducers
});

const rootReducer = (state, action) => {
  let currentState = state;
  if (action.type === 'REMOVE_USER') {
    currentState = undefined;
  }

  return reducers(currentState, action);
};

export default rootReducer;
