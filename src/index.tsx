import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TickersPage from "./pages/TickersPage";
import './App.css'
import NotificationList from "./components/NotificationList";

const routes = (
    <BrowserRouter>
        <NotificationList>
            <div className='container mx-auto'>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/tickers" component={TickersPage}/>
                    <Redirect from="/" to="/home"/>
                </Switch>
            </div>
        </NotificationList>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById("root"));
