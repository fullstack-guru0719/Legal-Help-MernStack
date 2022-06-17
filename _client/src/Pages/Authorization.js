import React, { useEffect, useState, useCallback } from 'react';
import { matchRoutes } from 'react-router-config';
import { withRouter, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './Routes';

const Authorization = ({ children }) => {

    const location = useLocation();
    const history = useHistory()
    const user = useSelector(state => state.user)
    const socket = useSelector(state => state.socket)
    const { pathname } = location;

    const [accessGranted, setGranted] = useState(true)

    useEffect(() => {
        const matched = matchRoutes(routes, pathname)[0];
        setGranted((matched && matched.route.auth && matched.route.auth.length > 0) ? matched.route.auth.includes(user.role) : true)
    }, [user, pathname])

    useEffect(() => {
        if (!accessGranted) {
            redirectRoute();
        }
    }, [user, location, accessGranted, pathname])


    const redirectRoute = useCallback(() => {
        const { pathname, state } = location;
        /*
        User is guest
        Redirect to Login Page
        */
        if (user.role === 'guest') {
            history.push({
                pathname: '/login',
                state: { redirectUrl: pathname }
            });
        }
        /*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or redirectUrl
        */
        else {
            const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/conversation/chat';
            history.push({
                pathname: redirectUrl
            });
        }
    }, [user, location, history])

    return (accessGranted ? <React.Fragment>{children}</React.Fragment> : null)
}

export default withRouter(Authorization);
// import React, { Component } from 'react';
// import { matchRoutes } from 'react-router-config';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import routes from './Routes';

// class FuseAuthorization extends Component {

//     constructor(props, context) {
//         super(props);
//         this.state = {
//             accessGranted: true
//         };
//     }

//     componentDidMount() {
//         if (!this.state.accessGranted) {
//             this.redirectRoute(this.props);
//         }
//     }

//     componentDidUpdate() {
//         if (!this.state.accessGranted) {
//             this.redirectRoute(this.props);
//         }
//     }

//     static getDerivedStateFromProps(props, state) {
//         const { location, user } = props;
//         const { pathname } = location;

//         const matched = matchRoutes(routes, pathname)[0];

//         const accessGranted = (matched && matched.route.auth && matched.route.auth.length > 0) ? matched.route.auth.includes(user.role) : true;

//         return {
//             accessGranted
//         };
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         return nextState.accessGranted !== this.state.accessGranted;
//     }

//     redirectRoute(props) {
//         const { location, user, history } = props;
//         const { pathname, state } = location;
//         /*
//         User is guest
//         Redirect to Login Page
//         */
//         if (user.role === 'guest') {
//             history.push({
//                 pathname: '/login',
//                 state: { redirectUrl: pathname }
//             });
//         }
//         /*
//         User is member
//         User must be on unAuthorized page or just logged in
//         Redirect to dashboard or redirectUrl
//         */
//         else {
//             const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/conversation/chat';

//             history.push({
//                 pathname: redirectUrl
//             });
//         }
//     }

//     render() {
//         const { children } = this.props;
//         const { accessGranted } = this.state;
//         // console.info('Fuse Authorization rendered', accessGranted);
//         return accessGranted ? <React.Fragment>{children}</React.Fragment> : null;
//     }
// }

// function mapStateToProps({ user }) {
//     return {
//         user: user
//     }
// }


// export default withRouter(connect(mapStateToProps)(FuseAuthorization));
