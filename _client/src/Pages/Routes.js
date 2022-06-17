import React from 'react';
import { Link } from 'react-router-dom';
import LoginPage from '../initialpage/loginpage';
import RegistrationPage from '../initialpage/RegistrationPage';
import DefaultLayout from '../initialpage/Sidebar/DefaultLayout';
import Chatlayout from '../initialpage/Sidebar/chatlayout';
import LandingPage from '../initialpage/LandingPage';
import ProfilePage from '../MainPage/Pages/Profile';

import authRoles from '../helpers/authRoles';

const Routes = [
    {
        path: '/login',
        component: LoginPage,
        // render: () => (
        //     <h1 onClick={() => history.push("/register")}>Login</h1>
        // ),
        auth: authRoles.onlyGuest
    },
    {
        path: '/register',
        // render: () => (
        //     <h1 onClick={() => history.push("/login")}>Register</h1>
        // ),
        component: RegistrationPage,
        auth: authRoles.onlyGuest
    },
    {
        path: '/conversation',
        component: Chatlayout,
        // render: () => (
        //     <Link to="/login">Home</Link>
        // ),
        auth: authRoles.user
    },
    {
        path: '/profile',
        component: ProfilePage,
        // render: () => (
        //     <Link to="/login">Home</Link>
        // ),
        auth: authRoles.user
    },
    {
        path: '/',
        component: LandingPage,
        exact: true,
        // render: () => (
        //     <Link to="/login">Home</Link>
        // ),
        auth: authRoles.all
    }
];

export default Routes;
