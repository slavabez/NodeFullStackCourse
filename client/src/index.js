// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

// Reducers
import reducers from './reducers';

// Components
import App from './components/App';

// Styles
// import './styles/preset.css';
import 'materialize-css/dist/css/materialize.min.css';

// Setup redux and reducers
const initialState = {};
const store = createStore(
    reducers,
    initialState,
    applyMiddleware(
        reduxThunk
    )
);

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('react_element')
);