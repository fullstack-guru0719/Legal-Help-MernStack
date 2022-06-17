/**
 * App Header
 */
import React, { useState, useEffect, useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { jwtService } from '../../services';
import { socketActions, loginActions } from '../../store/actions';
import { User, Avatar_02, Avatar_05, Avatar_09, Avatar_10 } from '../../Entryfile/imagepath';

const Sidebar = props => {
    const { location } = props;
    let pathname = location.pathname;

    const currentRoomId = useSelector(state => state.socket.roomId, shallowEqual);
    const user = useSelector(state => state.user, shallowEqual);
    const login = useSelector(state => state.login, shallowEqual);
    const socket = useSelector(state => state.socket.socket, shallowEqual);
    const dispatch = useDispatch();
    const [rooms, setRooms] = useState([]);

    const filteredRooms = useCallback(
        newRooms => {
            let result;
            if (!user || !newRooms || !newRooms.length) return [];

            console.log('[sidebar user]', user);
            if (user.role === 'admin') result = newRooms;
            else
                result = newRooms.filter(
                    newRoom =>
                        newRoom.user && user._id && newRoom.user.toString() === user._id.toString()
                );

            return result;
        },
        [user]
    );

    useEffect(() => {
        if (login.questions && login.questions.length)
            jwtService
                .updateQuestions({ questionIds: login.questions, user: user._id })
                .then(response => {
                    setRooms(filteredRooms(response.data));
                    dispatch(loginActions.removeQuestions());
                })
                .catch(error => console.log('error', error));

        return () => {};
    }, [user, login]);

    useEffect(() => {
        jwtService
            .getRooms()
            .then(response => {
                setRooms(filteredRooms(response.data));
            })
            .catch(error => console.log('error', error));
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('updateRooms', rooms => {
                setRooms(filteredRooms(JSON.parse(rooms)));
            });
        }
    }, [socket, user]);

    const onClickRoom = useCallback(_id => dispatch(socketActions.setRoom(_id)));

    return (
        <div className="sidebar sidebar-right custom-sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div className="sidebar-menu">
                    <ul>
                        <li>
                            <Link to="/profile/employee-profile">
                                <i className="la la-home" /> <span>Account</span>
                            </Link>
                        </li>
                        <li className="menu-title">
                            <span>
                                {user.role === 'admin' ? 'Recent Questions' : 'My Questions'}
                            </span>
                            <a href="#" data-toggle="modal" data-target="#add_group">
                                <i className="fa fa-plus" />
                            </a>
                        </li>
                        {rooms &&
                            rooms.map(room => (
                                <li
                                    key={room._id}
                                    className={
                                        (room._id === currentRoomId ? 'room-active ' : '') +
                                        (!room.admin ? 'customer-recent' : 'admin-recent')
                                    }
                                >
                                    <a onClick={() => onClickRoom(room._id)}>
                                        <span className="chat-avatar-sm user-img">
                                            <img className="rounded-circle" alt="" src={User} />
                                        </span>
                                        <span className="chat-user">{room.name}</span>
                                        {!room.admin ? (
                                            <span className="badge badge-danger">!</span>
                                        ) : (
                                            <span></span>
                                        )}
                                    </a>
                                </li>
                            ))}
                        {/* <li className="menu-title">Direct Chats <a href="#" data-toggle="modal" data-target="#add_chat_user"><i className="fa fa-plus" /></a></li>
              <li>
                <a href="/purple/conversation/chat">
                  <span className="chat-avatar-sm user-img">
                    <img className="rounded-circle" alt="" src={Avatar_02} /><span className="status online" />
                  </span> 
                  <span className="chat-user">John Doe</span> <span className="badge badge-pill bg-danger">1</span>
                </a>
              </li>
              <li>
                <a href="/purple/conversation/chat">
                  <span className="chat-avatar-sm user-img">
                    <img className="rounded-circle" alt="" src={Avatar_09} /><span className="status offline" />
                  </span> 
                  <span className="chat-user">Richard Miles</span> <span className="badge badge-pill bg-danger">7</span>
                </a>
              </li>
              <li>
                <a href="/purple/conversation/chat">
                  <span className="chat-avatar-sm user-img">
                    <img className="rounded-circle" alt="" src={Avatar_10} /><span className="status away" />
                  </span> 
                  <span className="chat-user">John Smith</span>
                </a>
              </li>
              <li className="active">
                <a href="/purple/conversation/chat">
                  <span className="chat-avatar-sm user-img">
                    <img className="rounded-circle" alt="" src={Avatar_05} /><span className="status online" />
                  </span> 
                  <span className="chat-user">Mike Litorus</span> <span className="badge badge-pill bg-danger">2</span>
                </a>
              </li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Sidebar);
