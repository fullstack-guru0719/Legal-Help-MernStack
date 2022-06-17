import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { userActions, messageActions, socketActions } from '../store/actions';
import jwtService from '../services/jwtService';

import constants from '../helpers/constants';
const _socket = socketIOClient(constants.ENDPOINT);

const Auth = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        jwtCheck();
        // firebaseCheck();
    }, []);

    useEffect(() => {
        dispatch(socketActions.setSocket(_socket));

        // CLEAN UP THE EFFECT
        // return () => {
        // 	console.log('disconnecting in frontend')
        // 	_socket.disconnect();
        // }
    }, []);

    const jwtCheck = () => {
        jwtService.on('onAutoLogin', () => {
            props.showMessage({ message: 'Logging in with JWT' });

            /**
             * Sign in and retrieve user data from Api
             */
            jwtService
                .signInWithToken()
                .then(user => {
                    props.setUserData(user);

                    props.showMessage({ message: 'Logged in with JWT' });
                })
                .catch(error => {
                    props.showMessage({ message: error });
                });
        });

        jwtService.on('onAutoLogout', message => {
            if (message) {
                props.showMessage({ message });
            }
            props.logout();
        });

        jwtService.init();
    };

    return <React.Fragment>{props.children}</React.Fragment>;
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            logout: userActions.logoutUser,
            setUserData: userActions.setUserData,
            // setUserDataAuth0: userActions.setUserDataAuth0,
            setUserDataFirebase: userActions.setUserDataFirebase,
            showMessage: messageActions.showMessage,
            hideMessage: messageActions.hideMessage
        },
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(Auth);
