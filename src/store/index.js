import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import { counterReducer } from './reducers/counterReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  counterReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))