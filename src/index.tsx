import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import {App} from './App';
import {setupStore} from "./redux";
import {ThemeProvider} from "./hoc";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
    <Provider store={store}>
        <ThemeProvider>
            <BrowserRouter basename={process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASENAME : ''}>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
);
