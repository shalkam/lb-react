import React from 'react';
import ReactDOM from 'react-dom';
import {Store, Forms, RestForm} from 'react-at-rest';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router'
import PubSub from 'pubsub-js';
import {injectIntl} from 'react-intl';

import LoginForm from './Forms/LoginForm';
import LoginStore from './Stores/LoginStore';
import Logout from './Logout';

class Login extends React.Component {
    handleLogin(e) {
        e.preventDefault();
        const {email, password} = this.refs;
        const {messages} = this.props.intl;
        const loginStore = new LoginStore('users');
        loginStore.createResource({
          email: email.value,
          password: password.value
        }).then((user)=> {
          const userData = user.user;
          cookie.save('userData', userData, { path: '/' });
          PubSub.publish( 'NOTIFY', {
              autoDismiss: 3,
              dismissible: true,
              level: "info",
              message: messages['message.logged.body'] + userData.user.username,
              position: "br",
              title: messages['message.logged.title']
          });
          PubSub.publish( 'LOGGED_IN', '');
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
        });
    }
    handleSuccess(data) {
        const {messages} = this.props.intl;
        const userData = data.user;
        cookie.save('userData', userData, { path: '/' });
        PubSub.publish( 'NOTIFY', {
            autoDismiss: 3,
            dismissible: true,
            level: "info",
            message: messages['message.logged.body'] + userData.user.username,
            position: "br",
            title: messages['message.logged.title']
        });
        PubSub.publish( 'LOGGED_IN', '');
        if (this.props.redirect) {
            browserHistory.push(this.props.redirect);
        } else {
            browserHistory.push('/');
        }
    }
    render() {
      const {messages} = this.props.intl;
        return <form onSubmit={this.handleLogin.bind(this)}>
          <div className="form-group">
            <label className="control-label">{messages['label.email']}</label>
            <div>
            <input type="text" ref="email" label={messages['label.email']} className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">{messages['label.password']}</label>
            <div>
            <input type="password" ref="password" label={messages['label.password']} className="form-control"/>
            </div>
          </div>
          <button style={{margin: 10}} type='submit' className='btn btn-success'>{messages['label.login']}</button>
        </form>;
    }
}

export default injectIntl(Login);
