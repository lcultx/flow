import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as reducers from './reducers';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import thunk from 'redux-thunk';
import history from './history';


const store = createStore(
    combineReducers(
        {
            ...reducers,
            router: routerReducer
        }
    ),
    {},
    compose(
        applyMiddleware(routerMiddleware(history),thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : state => state
    )
);

export { store as default }
                     