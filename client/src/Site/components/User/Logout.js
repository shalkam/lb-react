import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import PubSub from 'pubsub-js';
import {injectIntl} from 'react-intl';

import LogoutStore from './Stores/LogoutStore';

class Logout extends React.Component {
    componentWillMount() {
      this.handleLogout();
    }
    handleLogout() {
        const {messages} = this.props.intl;
        const logoutStore = new LogoutStore('users');
        cookie.remove('token', { path: '/' });
        cookie.remove('userData', { path: '/' });
        logoutStore.createResource().then((data)=> {
          PubSub.publish( 'NOTIFY', {
              autoDismiss: 3,
              dismissible: true,
              level: "info",
              message: messages['message.loggedout.body'],
              position: "br",
              title: messages['message.loggedout.title']
          });
          PubSub.publish( 'LOGGED_OUT', '');
          if (this.props.redirect) {
              browserHistory.push(this.props.redirect);
          } else {
              browserHistory.push('/');
          }
        }).catch((error)=> {
          PubSub.publish( 'NOTIFY', {
              autoDismiss: 3,
              dismissible: true,
              level: "warning",
              message: error.body.error.message,
              position: "br",
              title: error.body.error.code
          });
        })
    }

    render() {
        return null;
    }
}

export default injectIntl(Logout);
