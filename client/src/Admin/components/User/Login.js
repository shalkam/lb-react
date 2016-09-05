import React from 'react';
import ReactDOM from 'react-dom';
import {Store} from 'react-at-rest';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router'
import PubSub from 'pubsub-js';

import LoginForm from './Form/LoginForm';
import LoginStore from './Stores/LoginStore';
import Logout from './Logout';

import '../../../../public/css/bootstrap.css';
import '../../../../public/css/bootstrap-rtl.min.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.loginStore = new LoginStore('users');
    }
    handleSuccess(user) {
        const userData = user.user;
        cookie.save('AdminUserData', userData, { path: '/' });
        PubSub.publish( 'NOTIFY', {
            autoDismiss: 3,
            dismissible: true,
            level: "info",
            message: "You've been successfully logged in as : " + userData.user.username,
            position: "br",
            title: "Logged in"
        });
        PubSub.publish( 'LOGGED_IN', '');
        if (this.props.redirect) {
            browserHistory.push(this.props.redirect);
        } else {
            browserHistory.push('/admin');
        }
    }

    render() {
        return <LoginForm
            store={this.loginStore}
            onSuccess={this.handleSuccess.bind(this) }
            />;
    }
}
