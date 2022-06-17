/**
 * Signin Firebase
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
    PlaceHolder,
    Attachment,
    Avatar_05,
    Avatar_02,
    Avatar_13,
    Avatar_16
} from '../../../Entryfile/imagepath';

import { jwtService } from '../../../services';

const convertDateToString = date => {
    const d = new Date(date);
    return `${d.getFullYear()}/${d.getMonth() +
        1}/${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

const ChatPage = () => {
    const socket = useSelector(state => state.socket.socket);
    const user = useSelector(state => state.user, shallowEqual);
    const currentRoomId = useSelector(state => state.socket.roomId, shallowEqual);
    const messagesEnd = React.useRef(null);

    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const [file, setFile] = useState({
        orgSource: null,
        uri: ''
    });
    const [fileSubmitted, setFileSubmitted] = useState(false);

    useEffect(() => {
        if (socket) {
            socket.on('receivedNewMessage', message => {
                setMessages(messages => messages.concat(JSON.parse(message)));
            });
        }
    }, [socket]);

    useEffect(() => {
        socket &&
            socket.emit('userJoined', {
                room: currentRoomId
            });
        return () => {
            socket && socket.removeListener('userJoined');
        };
    }, [socket, currentRoomId]);

    useEffect(() => {
        if (currentRoomId && currentRoomId !== 'null')
            jwtService
                .getRoomMessags(currentRoomId)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => setMessages([]));
    }, [currentRoomId]);

    useEffect(() => {
        if (messagesEnd && messagesEnd.current)
            messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages, messagesEnd]);
    // Form Listeners
    const handleChange = useCallback(e => {
        setContent(e.target.value);
    }, []);
    const handleChangeFile = useCallback(e => {
        setFile({
            orgSource: e.target.files[0],
            uri: URL.createObjectURL(e.target.files[0])
        });
    }, []);
    const handleFileSubmit = useCallback(e => setFileSubmitted(true), []);

    const clickSubmit = () => {
        if (file && file.orgSource) {
            const data = new FormData();
            data.append('attachments', file.orgSource);
            jwtService
                .postAttachments(data)
                .then(response => {
                    if (response && response.data) {
                        const { fullPath, originalName, mimeType } = response.data;
                        if (socket) {
                            socket.emit('newMessage', {
                                attachments: {
                                    fullPath,
                                    originalName,
                                    mimeType
                                },
                                content,
                                room: { _id: currentRoomId },
                                admin: user.role === 'admin' ? true : false
                            });
                            setFile({
                                orgSource: null,
                                uri: ''
                            });
                            setFileSubmitted(false);
                            setContent('');
                        }
                    }
                })
                .catch(error => console.log('[file uploading err]', error));
        } else if (content && socket) {
            socket.emit('newMessage', {
                attachments: {},
                content,
                room: { _id: currentRoomId },
                admin: user.role === 'admin' ? true : false
            });
            setContent('');
        }
    };
    // , [content, socket, currentRoomId, user]);

    return (
        <div className="page-wrapper chat-page">
            <Helmet>
                <title>Chat - HRMS Admin Template</title>
                <meta name="description" content="Chat" />
            </Helmet>
            {/* Chat Main Row */}
            <div className="chat-main-row">
                {/* Chat Main Wrapper */}
                <div className="chat-main-wrapper">
                    {/* Chats View */}
                    <div className="col-lg-12 message-view task-view">
                        <div className="chat-window">
                            <div className="fixed-header">
                                <div className="navbar">
                                    <div className="user-details mr-auto">
                                        <div className="user-info float-left">
                                            <span>My Chat</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-contents">
                                <div className="chat-content-wrap">
                                    <div className="chat-wrap-inner">
                                        <div className="chat-box">
                                            <div className="chats">
                                                {messages &&
                                                    messages.map(message => (
                                                        <div
                                                            key={message._id}
                                                            className="chat chat-left"
                                                        >
                                                            <div className="chat-avatar">
                                                                <span className="mr-2">
                                                                    {message.admin
                                                                        ? 'Admin'
                                                                        : 'Customer'}
                                                                </span>
                                                            </div>
                                                            <div className="chat-body">
                                                                <div className="chat-bubble">
                                                                    <div className="chat-content">
                                                                        <p>{message.content}</p>
                                                                        {message.attachments &&
                                                                        message.attachments
                                                                            .originalName ? (
                                                                            <ul class="attach-list">
                                                                                <li>
                                                                                    <i class="fa fa-file"></i>{' '}
                                                                                    <a
                                                                                        href={
                                                                                            '/download/' +
                                                                                            message
                                                                                                .attachments
                                                                                                .fullPath
                                                                                        }
                                                                                        target="_blank"
                                                                                    >
                                                                                        {
                                                                                            message
                                                                                                .attachments
                                                                                                .originalName
                                                                                        }
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        ) : (
                                                                            ''
                                                                        )}
                                                                    </div>
                                                                    <span className="chat-time">
                                                                        {convertDateToString(
                                                                            message.created_at
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                <div
                                                    style={{ float: 'left', clear: 'both' }}
                                                    ref={messagesEnd}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-footer">
                                <a
                                    className="link attach-icon btn btn-primary"
                                    href="#"
                                    data-toggle="modal"
                                    data-target="#drag_files"
                                >
                                    <i className="fa fa-paperclip" />
                                    Add Attachment
                                </a>
                                <div>
                                    {file.orgSource && fileSubmitted && (
                                        <span>{file.orgSource.name}</span>
                                    )}
                                </div>
                                <div className="message-bar">
                                    <div className="message-inner">
                                        <div className="message-area">
                                            <div className="input-group">
                                                <textarea
                                                    onChange={handleChange}
                                                    value={content}
                                                    className="form-control custom-textarea"
                                                    placeholder="Type message..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={clickSubmit}
                                    className="btn btn-custom custom-send-button"
                                    type="button"
                                >
                                    <i className="fa fa-send" />
                                    Send
                                </button>
                                <div className="row custom-footer">
                                    <span>Terms of Service</span>
                                    <span>Copyright 2020</span>
                                    <span>Customer ID: {'125233400390'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Chat Main Row */}
            {/* Drogfiles Modal */}
            <div id="drag_files" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Select file to upload</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {file.orgSource && <span>{file.orgSource.name}</span>}
                            {/* <div className="upload-image-preview">
                                {file.uri && <img src={file.uri} alt="" />}
                            </div> */}
                            <form id="js-upload-form">
                                <div className="upload-drop-zone" id="drop-zone">
                                    <input
                                        className="background-file-upload"
                                        type="file"
                                        onChange={handleChangeFile}
                                    />
                                    {/* <input className="background-file-upload" type='file'  /> */}
                                    <i className="fa fa-cloud-upload fa-2x" />{' '}
                                    <span className="upload-text">Select file to upload</span>
                                </div>
                            </form>
                            <div className="submit-section">
                                <button
                                    onClick={handleFileSubmit}
                                    data-dismiss="modal"
                                    className="btn btn-primary submit-btn"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Drogfiles Modal */}
            {/* Add Group Modal */}
            <div id="add_group" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create a group</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Groups are where your team communicates. They’re best when organized
                                around a topic — #leads, for example.
                            </p>
                            <form>
                                <div className="form-group">
                                    <label>
                                        Group Name <span className="text-danger">*</span>
                                    </label>
                                    <input className="form-control" type="text" />
                                </div>
                                <div className="form-group">
                                    <label>
                                        Send invites to:{' '}
                                        <span className="text-muted-light">(optional)</span>
                                    </label>
                                    <input className="form-control" type="text" />
                                </div>
                                <div className="submit-section">
                                    <button className="btn btn-primary submit-btn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add Group Modal */}
            {/* Add Chat User Modal */}
            <div id="add_chat_user" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Direct Chat</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group m-b-30">
                                <input
                                    placeholder="Search to start a chat"
                                    className="form-control search-input"
                                    type="text"
                                />
                                <span className="input-group-append">
                                    <button className="btn btn-primary">Search</button>
                                </span>
                            </div>
                            <div>
                                <h5>Recent Conversations</h5>
                                <ul className="chat-user-list">
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <span className="avatar align-self-center">
                                                    <img src={Avatar_16} alt="" />
                                                </span>
                                                <div className="media-body align-self-center text-nowrap">
                                                    <div className="user-name">Jeffery Lalor</div>
                                                    <span className="designation">Team Leader</span>
                                                </div>
                                                <div className="text-nowrap align-self-center">
                                                    <div className="online-date">1 day ago</div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="media ">
                                                <span className="avatar align-self-center">
                                                    <img src={Avatar_13} alt="" />
                                                </span>
                                                <div className="media-body align-self-center text-nowrap">
                                                    <div className="user-name">
                                                        Bernardo Galaviz
                                                    </div>
                                                    <span className="designation">
                                                        Web Developer
                                                    </span>
                                                </div>
                                                <div className="align-self-center text-nowrap">
                                                    <div className="online-date">3 days ago</div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <span className="avatar align-self-center">
                                                    <img src={Avatar_02} alt="" />
                                                </span>
                                                <div className="media-body text-nowrap align-self-center">
                                                    <div className="user-name">John Doe</div>
                                                    <span className="designation">
                                                        Web Designer
                                                    </span>
                                                </div>
                                                <div className="align-self-center text-nowrap">
                                                    <div className="online-date">7 months ago</div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add Chat User Modal */}
            {/* Share Files Modal */}
            <div id="share_files" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Share File</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="files-share-list">
                                <div className="files-cont">
                                    <div className="file-type">
                                        <span className="files-icon">
                                            <i className="fa fa-file-pdf-o" />
                                        </span>
                                    </div>
                                    <div className="files-info">
                                        <span className="file-name text-ellipsis">
                                            AHA Selfcare Mobile Application Test-Cases.xls
                                        </span>
                                        <span className="file-author">
                                            <a href="#">Bernardo Galaviz</a>
                                        </span>{' '}
                                        <span className="file-date">May 31st at 6:53 PM</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Share With</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Share</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Share Files Modal */}
        </div>
    );
};

export default ChatPage;
