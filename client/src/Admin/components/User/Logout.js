import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import PubSub from 'pubsub-js';

import LogoutStore from './Stores/LogoutStore';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.logoutStore = new LogoutStore('users');
    }
    componentWillMount() {
      this.handleLogout();
    }
    handleLogout() {
        cookie.remove('AdminToken', { path: '/' });
        cookie.remove('AdminUserData', { path: '/' });
        this.logoutStore.createResource();
        PubSub.publish( 'NOTIFY', {
            autoDismiss: 3,
            dismissible: true,
            level: "info",
            message: "You've been successfully Logged out",
            position: "br",
            title: "Logged out"
        });
        PubSub.publish( 'LOGGED_OUT', '');
        if (this.props.redirect) {
            browserHistory.push(this.props.redirect);
        } else {
            browserHistory.push('/admin');
        }
    }

    render() {
        return null;
    }
}
