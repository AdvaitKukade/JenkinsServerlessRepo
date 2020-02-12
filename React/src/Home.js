import React from 'react';
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";


const Home = () => {

    return (
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" render={() => (<h2>Login</h2>)} />
        </Switch>
    )
}

export default Home;