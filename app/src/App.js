import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter} from "react-router-dom";
import AppRoute from "./AllRoute/AppRoute";
import './Asset/Css/CustomCss.css'
import {Provider} from "react-redux";
import {Store} from "./Redux/Store";
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
    return (
        <>
            <Provider store={Store}>
                <HashRouter>
                    <AppRoute/>
                </HashRouter>
            </Provider>
        </>
    );
}

export default App;