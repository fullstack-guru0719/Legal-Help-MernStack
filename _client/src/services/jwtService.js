import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Utils from '../helpers/Utils';

const api = 'http://mir.miraclelegal.com:8000/api';
// const api = '/api';
const api_auth = api + '/auth';
const api_room = api + '/room';
const api_message = api + '/messages';
// const api = '/api/auth'

class jwtService extends Utils.EventEmitter {
    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(
            response => {
                return response;
            },
            err => {
                return new Promise((resolve, reject) => {
                    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                        // if you ever get an unauthorized response, logout the user
                        this.emit('onAutoLogout', 'Invalid access_token');
                        this.setSession(null);
                    }
                    throw err;
                });
            }
        );
    };

    handleAuthentication = () => {
        let access_token = this.getAccessToken();

        if (!access_token) {
            return;
        }

        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        } else {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = data => {
        return new Promise((resolve, reject) => {
            axios.post(api_auth + '/register', data).then(response => {
                if (response.data.user) {
                    this.setSession(response.data.access_token);
                    resolve(response.data.user);
                } else {
                    reject(response.data.errors);
                }
            });
        });
    };

    signInWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            axios
                .post(api_auth + '/login', {
                    email,
                    password
                })
                .then(response => {
                    if (response.data.user) {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    } else {
                        console.log('login error response', response.data);
                        reject(response.data.errors);
                    }
                });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axios
                .get(api_auth + '/access-token', {
                    params: {
                        access_token: this.getAccessToken()
                    }
                })
                .then(response => {
                    if (response.data.user) {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    } else {
                        reject(response.data.error);
                    }
                });
        });
    };

    updateUserData = user => {
        return axios.post(api_auth + '/user/update', {
            user: user
        });
    };

    /** Chat Service */
    getRooms = () => {
        return axios.get(api_room);
    };
    getRoomMessags = roomId => {
        return axios.get(api_message + `/${roomId}`);
    };
    postAttachments = file => axios.post(api_message + '/attachments', file);
    addQuestion = (user, text) => {
        return axios.post(api_room + '/', {
            user,
            text
        });
    };
    updateQuestions = ({ questionIds, user }) => {
        return axios.put(api_room + '/', {
            questionIds,
            user
        });
    };
    /** End of Chat Service */
    setSession = access_token => {
        if (access_token) {
            localStorage.setItem('jwt_access_token', access_token);
            axios.defaults.headers.common['Authorization'] = access_token;
        } else {
            localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if (!access_token) {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        } else {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new jwtService();

export default instance;
