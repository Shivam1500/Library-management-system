// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk';
// import authReducer from '../reducers/authReducers';


// const rootReducer = combineReducers({
//     auth: authReducer
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from '../reducers/authReducers';
import bookReducer from '../reducers/bookReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    books: bookReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;