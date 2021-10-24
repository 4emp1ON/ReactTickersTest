import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TickersPage from "./pages/TickersPage";
import './App.css'
import NotificationProvider from "./components/NotificationProvider/NotificationProvider";

const routes = (
    <BrowserRouter>
        <NotificationProvider>
            <div className='container mx-auto'>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/tickers" component={TickersPage}/>
                    <Redirect from="/" to="/home"/>
                </Switch>
            </div>
        </NotificationProvider>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById("root"));
