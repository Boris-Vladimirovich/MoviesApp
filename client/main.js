import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import MoviesApp from './containers/MoviesApp.jsx';

ReactDOM.render(
    <Provider store={store}>
        <MoviesApp/>
    </Provider>,
    document.getElementById("app"));