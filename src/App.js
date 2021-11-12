import { makeStyles } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import CoinPage from "./page/CoinPage";
import HomePage from "./page/HomePage";
import Login from "./components/authentication/authentication/Auth";
import Alert from "./components/alert/Alert";

function App() {
    const useStyle = makeStyles(() => ({
        App: {
            backgroundColor: "#14161a",
            color: "#fff",
            minHeight: "100vh",
            overflowX: "hidden",
        },
    }));
    const classes = useStyle();

    return (
        <Router>
            <div className={classes.App}>
                <Header />
                <Switch>
                    <PrivateRoute path="/" exact>
                        <HomePage />
                    </PrivateRoute>
                    <PrivateRoute path="/coins/:id">
                        <CoinPage />
                    </PrivateRoute>
                    <Route path="/login" component={Login} />
                </Switch>
            </div>
            <Alert />
        </Router>
    );
}

export default App;
