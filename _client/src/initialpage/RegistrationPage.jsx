/**
 * Signin Firebase
 */

import React, { useState, useCallback } from 'react';
import { Helmet } from "react-helmet";
import { Link, withRouter } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { Applogo } from '../Entryfile/imagepath.jsx'
import { registerActions } from '../store/actions';


const Registrationpage = (props) => {
  const dispatch = useDispatch();

  const register = useSelector(state => state.register, shallowEqual)
  // component states
  const [submitted, setSubmitted] = useState(false)
  const [state, setState] = useState({
    email: '',
    password: '',
    repeatpassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  })

  const { email, password, repeatpassword, firstName, lastName, phone } = state;
  // form handlers
  const registerClick = useCallback(
    e => {
      e.preventDefault();

      setSubmitted(true);
      if (email && password && password === repeatpassword && firstName && lastName && phone) {
        dispatch(registerActions.submitRegister({ email, password, firstName, lastName, phone }));
      }
    },
    [state],
  )

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setState(prevState => ({
        ...prevState,
        [name]: value
      }))
    },
    [],
  )

  const { loading } = props;
  return (

    <div className="main-wrapper">
      <Helmet>
        <title>Register - HRMS Admin Template</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="account-content">
        <a href="/purple/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</a>
        <div className="container">
          {/* Account Logo */}
          <div className="account-logo">
            <a href="/purple/app/main/dashboard"><img src={Applogo} alt="Dreamguy's Technologies" /></a>
          </div>
          {/* /Account Logo */}
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">Create Account</h3>
              <p className="account-subtitle">Access to our dashboard</p>
              {/* Account Form */}
              <form>
                <div className="form-group">
                  <label>First Name</label>
                  <input onChange={handleChange} name="firstName" className="form-control" type="text" />
                  {submitted && !firstName &&
                    <div className="text-danger">First Name is required</div>
                  }
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input onChange={handleChange} name="lastName" className="form-control" type="text" />
                  {submitted && !lastName &&
                    <div className="text-danger">Last Name is required</div>
                  }
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input onChange={handleChange} name="email" className="form-control" type="email" />
                  {submitted && !email &&
                    <div className="text-danger">Email is required</div>
                  }
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input onChange={handleChange} name="phone" className="form-control" type="text" />
                  {submitted && !phone &&
                    <div className="text-danger">Phone is required</div>
                  }
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input onChange={handleChange} name="password" className="form-control" type="password" />
                  {submitted && !password &&
                    <div className="text-danger">Password is required</div>
                  }
                </div>
                <div className="form-group">
                  <label>Password Confirm</label>
                  <input onChange={handleChange} name="repeatpassword" className="form-control" type="password" />
                  {submitted && repeatpassword !== password &&
                    <div className="text-danger">Password is incorrect</div>
                  }
                </div>
                {submitted && register.error && Object.keys(register.error).map(key => (
                  <div key={key} className="text-danger"><strong>{key}</strong> : {register.error[key]}</div>
                ))}
                <div className="form-group text-center">
                  <button className="btn btn-primary account-btn" onClick={registerClick}>Create Account</button>
                </div>
                <div className="account-footer">
                  <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
              </form>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Registrationpage);
