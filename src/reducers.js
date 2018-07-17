import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as reducers from '../src/state/modules';

// we will combine all reducers here, then export
export default combineReducers({
  routing: routerReducer,
  ...reducers
});
