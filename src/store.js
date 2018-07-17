
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import createDebounce from 'redux-debounced';
import createHistory from 'history/createBrowserHistory';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import reducers from './reducers';
// import * as epics from '../src/state/modules';
import { dashboard } from 'state';
const { operations } = dashboard;
// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics(operations.fetchUserEpic, operations.searchEpic);
// Build the middlewares for debounce, thunk, and intercepting and dispatching navigation actions
const middlewares = [
    createDebounce(),
    thunkMiddleware,
    routerMiddleware(history),
    epicMiddleware,
];

// Configure devtools
// Also apply our middlewares
export default composeWithDevTools(
    applyMiddleware(...middlewares),
)(createStore)(reducers);

epicMiddleware.run(rootEpic);