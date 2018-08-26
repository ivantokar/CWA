import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Weather } from './reducer';

export default createStore(
    combineReducers({
        Weather,
    }),
    composeWithDevTools(applyMiddleware(thunk)),
);
