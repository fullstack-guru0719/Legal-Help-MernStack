/**
 * Signin Firebase
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Applogo, AvatarEmploymentLaw, AvatarLandingJane, User } from '../Entryfile/imagepath.jsx';
import { loginActions } from '../store/actions';
import { jwtService } from '../services';
import { useRef } from 'react';

const Typing = () => (
    <div className="chat chat-left">
        <div className="chat-avatar">
            <a href="" className="avatar">
                <img alt="" src={AvatarLandingJane} />
            </a>
        </div>
        <div className="chat-bubble">
            <div className="chat-content p-1">
                <div className="typing">
                    <div className="typing__dot"></div>
                    <div className="typing__dot"></div>
                    <div className="typing__dot"></div>
                </div>
            </div>
        </div>
    </div>
);

const adminMessages = [
    {
        delay: 0,
        text: 'Hi. How can I help you with your question?'
    },
    {
        delay: 3,
        text: 'Laws vary by state. What state are you in?'
    },
    {
        delay: 3,
        text: 'What have you done so far?'
    },
    // {
    //     delay: 5,
    //     text:
    //         "OK. Got it. I'm sending you to a secure page to join JustAnswer for only $5 (fully-refundable). While you're filling out that form, I'll tell the Lawyer about your situation and then connect you two. "
    // },
    {
        delay: 0,
        text:
            'OK. Rest assured that the lawyer can help you. I am now sending you to a secure page to for just $5. Fully-refundable. I will tell the lawyer about your situation while you are completing the form and connect you.'
    },
    {
        delay: 10,
        text: ''
    }
];

const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user, shallowEqual);
    const socket = useSelector(state => state.socket.socket, shallowEqual);

    const [text, setText] = useState('');
    const [messages, setMesasges] = useState([
        {
            admin: true,
            text: adminMessages[0].text
        }
    ]);
    const [typing, setTyping] = useState(false);
    const [timerId, setTimerId] = useState(null);

    // useEffect(() => {
    //   dispatch(socketActions.setSocket(_socket))

    //   // CLEAN UP THE EFFECT
    //   return () => {
    //     console.log('disconnecting in frontend')
    //     socket.disconnect();
    //   }
    // }, [socket]);

    const handleTextChange = useCallback(e => setText(e.target.value), []);
    // const clickStart = useCallback(() => {
    //   jwtService.addQuestion(user._id, text)
    //     .then((response) => {
    //       _socket.emit('roomAdded', response.data.rooms);
    //       dispatch(loginActions.addQuestion(response.data.newRoom))
    //       history.push({
    //         pathname: '/conversation/chat',
    //         state: { redirectUrl: '/' }
    //       });
    //     })
    //     .catch(error => {
    //     });
    // }, [text, user, socket])

    const [messagesEnd, setMessagesEnd] = useState(null);
    const scroll2Bottom = () => {};

    const clickStart = () => {
        let savedQ = '';
        let adminMessageCnt = messages.filter(m => m.admin === true).length;

        if (!text) return;
        if (adminMessageCnt <= adminMessages.length - 2) savedQ = text;
        if (timerId) clearTimeout(timerId);

        setMesasges(messages =>
            messages.concat({
                admin: false,
                text
            })
        );
        setText('');
        setTyping(true);

        const newTimer = setTimeout(() => {
            setMesasges(messages =>
                messages.concat({
                    admin: true,
                    text: adminMessages[adminMessageCnt].text
                })
            );
            setTimerId(newTimer);
            scroll2Bottom();

            if (adminMessageCnt === adminMessages.length - 2) {
                setTimeout(() => {
                    jwtService
                        .addQuestion(user._id, savedQ)
                        .then(response => {
                            socket.emit('roomAdded', response.data.rooms);
                            dispatch(loginActions.addQuestion(response.data.newRoom));
                            history.push({
                                pathname: '/conversation/chat',
                                state: { redirectUrl: '/' }
                            });
                        })
                        .catch(error => {});
                }, adminMessages[adminMessageCnt + 1].delay * 1000);
            } else {
                setTyping(false);
            }
        }, adminMessages[adminMessageCnt].delay * 1000);
    };
    useEffect(() => {
        return () => {
            clearTimeout(timerId);
        };
    }, [timerId]);
    useEffect(() => scroll2Bottom(), []);

    return (
        <div className="main-wrapper">
            <Helmet>
                <title>Landing Page</title>
                <meta name="description" content="Login page" />
            </Helmet>
            <div className="landing-page">
                {/* <a href="/purple/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</a> */}
                <div className="landing-header">
                    <div className="container">
                        <div className="header-left">
                            <div className="service">
                                <h2>Talk to a lawyer now!</h2>
                                <ul>
                                    <li>Get Legal help and protect your rights 24/7</li>
                                    <li>Get Legal help and protect your rights 24/7</li>
                                    <li>Get Legal help and protect your rights 24/7</li>
                                </ul>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="chat-card">
                                <div className="card-header">
                                    <img src={AvatarLandingJane} alt="admin-avatar" />
                                    <div className="user-name">
                                        <span>Erin Mitchell</span>
                                        <span>Legal Administrator</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {messages.map((message, idx) => (
                                        <div
                                            key={idx}
                                            className={
                                                'chat ' +
                                                (message.admin ? 'chat-left' : 'chat-right')
                                            }
                                        >
                                            <div className="chat-avatar">
                                                <a
                                                    href="/purple/app/profile/employee-profile"
                                                    className="avatar"
                                                >
                                                    <img
                                                        alt=""
                                                        src={
                                                            message.admin ? AvatarLandingJane : User
                                                        }
                                                    />
                                                </a>
                                            </div>
                                            <div className="chat-body">
                                                <div className="chat-bubble">
                                                    <div className="chat-content">
                                                        <p>{message.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {typing && <Typing />}
                                    <div
                                        style={{ float: 'left', clear: 'both' }}
                                        ref={el => {
                                            setMessagesEnd(el);
                                        }}
                                    ></div>
                                </div>
                                <div className="card-chat">
                                    <input
                                        type="text"
                                        value={text}
                                        onChange={handleTextChange}
                                        placeholder="Type your question here..."
                                    />
                                    <button onClick={clickStart}>Start Chat</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="landing-hiw">
                    <div className="container">
                        <div className="hiw-left">
                            <h2>How it works</h2>
                            <div className="hiw-body">
                                <div className="hiw-item">
                                    <img src={Applogo} alt="service" />
                                    <div className="item-text">
                                        <span>Connect</span>
                                        <span>
                                            Tell the immigration Laywer's assitant what's going on
                                            so that so can find the best attorney for your situation
                                        </span>
                                    </div>
                                </div>
                                <div className="hiw-item">
                                    <img src={Applogo} alt="service" />
                                    <div className="item-text">
                                        <span>Connect</span>
                                        <span>
                                            Tell the immigration Laywer's assitant what's going on
                                            so that so can find the best attorney for your situation
                                        </span>
                                    </div>
                                </div>
                                <div className="hiw-item">
                                    <img src={Applogo} alt="service" />
                                    <div className="item-text">
                                        <span>Connect</span>
                                        <span>
                                            Tell the immigration Laywer's assitant what's going on
                                            so that so can find the best attorney for your situation
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hiw-right"></div>
                    </div>
                </div>
                <div className="landing-firm"></div>
                <div className="landing-lc">
                    <div className="container">
                        <h2>Legal Categories</h2>
                        <div className="each-category">
                            <img src={AvatarEmploymentLaw} alt="" />
                            <div className="category-body">
                                <h3>Immigration Law</h3>
                                <div className="item-container">
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Fiance Visa</span>
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Green Card</span>
                                    <span className="each-tag">Green Card</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(LandingPage);
