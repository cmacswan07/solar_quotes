import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from "auth-api";

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {
    console.log(rest, isAuthenticated);
    return (
        <Route {...rest } render={(props) => (
            isAuthenticated == true ?
                <Component {...props} /> :
                <Redirect to="/login" />
        )} />
    );
}

export default PrivateRoute;