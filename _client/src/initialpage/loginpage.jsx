/**
 * Signin Firebase
 */

import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Link, withRouter, useHistory } from 'react-router-dom';

import { Applogo } from '../Entryfile/imagepath.jsx';

import { loginActions, userActions } from '../store/actions';

const Loginpage = () => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.login, shallowEqual);

    // component states
    const [submitted, setSubmitted] = useState(false);
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const { email, password } = state;

    // form handlers
    const loginclick = useCallback(() => {
        setSubmitted(true);
        // history.push('/home')
        if (email && password) {
            dispatch(loginActions.submitLogin({ email, password }));
        }
    }, [email, password]);

    const handleChange = useCallback(e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    // render
    return (
        <div className="main-wrapper">
            <Helmet>
                <title>Login - HRMS Admin Template</title>
                <meta name="description" content="Login page" />
            </Helmet>
            <div className="account-content">
                {/* <a href="/purple/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</a> */}
                <div className="container">
                    {/* Account Logo */}
                    <div className="account-logo">
                        <Link to="/">
                            <img src={Applogo} alt="Go to Landing Page" />
                        </Link>
                    </div>
                    {/* /Account Logo */}
                    <div className="account-box">
                        <div className="account-wrapper">
                            <h3 className="account-title">Login</h3>
                            <p className="account-subtitle">Access to our dashboard</p>
                            {/* Account Form */}
                            <form
                                action="https://www.paypal.com/cgi-bin/webscr"
                                method="post"
                                target="_top"
                                className="mt-3 p-3"
                            >
                                <input type="hidden" name="cmd" value="_s-xclick" />
                                <input
                                    type="hidden"
                                    name="hosted_button_id"
                                    value="F9KLXQNGXFH3C"
                                />
                                <input
                                    type="image"
                                    src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
                                    border="0"
                                    name="submit"
                                    alt="PayPal - The safer, easier way to pay online!"
                                />
                                <img
                                    alt=""
                                    border="0"
                                    src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                                    width="1"
                                    height="1"
                                />
                            </form>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        onChange={handleChange}
                                        className="form-control"
                                        type="text"
                                        name="email"
                                    />
                                    {submitted && !email && (
                                        <div className="text-danger">Email is required</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <label>Password</label>
                                        </div>
                                        <div className="col-auto">
                                            <a className="text-muted" href="/purple/forgotpassword">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <input
                                        onChange={handleChange}
                                        className="form-control"
                                        type="password"
                                        name="password"
                                    />
                                    {submitted && !password && (
                                        <div className="text-danger">Password is required</div>
                                    )}
                                </div>
                                {submitted &&
                                    login.error &&
                                    Object.keys(login.error).map(key => (
                                        <div key={key} className="text-danger">
                                            <strong>{key}</strong> : {login.error[key]}
                                        </div>
                                    ))}
                                <div className="form-group text-center">
                                    <a className="btn btn-primary account-btn" onClick={loginclick}>
                                        Login
                                    </a>
                                </div>
                                <div className="account-footer">
                                    <p>
                                        Don't have an account yet?{' '}
                                        <Link to="/register">Register</Link>
                                    </p>
                                </div>
                            </form>

                            {/* /Account Form */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default withRouter(Loginpage);
