import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import promise from 'redux-promise';
import rootReducer from './reducers/index';
import reduxThunk from 'redux-thunk';

import App from './App';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    
, document.getElementById('root'));
registerServiceWorker();