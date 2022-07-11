import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import rootReducer from './reducers/root'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'

const theStore= createStore(rootReducer,composeWithDevTools())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={theStore} >
        <App />
    </Provider>
);

