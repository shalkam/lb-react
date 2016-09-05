import React from 'react';
import {DeliveryService} from 'react-at-rest';
import cookie from 'react-cookie';
import {browserHistory} from 'react-router';
import PubSub from 'pubsub-js';
import {injectIntl} from 'react-intl';

import Roles from '../../../../Common/config/RoleStore';
import Form from './Form';
import StoreIndex from '../Stores';

class FormIndex extends DeliveryService {
  componentWillMount() {
    Roles.matchRoles(['authorized'], '/user/login');
    this.store = new StoreIndex('Posts');
  }

  bindResources(props) {
    if (this.props.params.id) {
      this.retrieveResource(this.store, { id: this.props.params.id });
    } else {
      let userData = cookie.load('userData', { path: '/' });
      let userid;
      if (userData !== undefined) {
        userData = JSON.parse(cookie.load('userData', { path: '/' }));
        userid = userData.user.id;
      }
      this.setState({ Post: { userid }, loaded: true });
    }
  }

  handleSuccess(data) {
    const {messages} = this.props.intl;
    const {id} = this.props.params;
    if (data && !id) {
      const {Post} = data;
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: "success",
        message: messages['message.created.body'],
        position: "br",
        title: messages['message.created.title']
      });
      browserHistory.push('/posts/' + Post.id);
    } else if (data && id) {
      const {Post} = data;
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: "success",
        message: messages['message.updated.body'],
        position: "br",
        title: messages['message.updated.title']
      });
      browserHistory.push('/posts/' + Post.id);
    } else {
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: "info",
        message: messages['message.submitted.body'],
        position: "br",
        title: messages['message.submitted.title']
      });
      browserHistory.push('/posts/' + this.state.Post.id);
    }
  }

  render() {
    const {messages} = this.props.intl;
    if (!this.state.loaded && this.props.params.id) {
      PubSub.publish('NOTIFY', {
        autoDismiss: false,
        dismissible: true,
        level: "info",
        message: messages['message.loading.body'],
        position: "br",
        title: messages['message.loading.title'],
        uid: 'loading-post-form'
      });
      return null;
    }
    PubSub.publish('NOTIFY_REMOVE', 'loading-post-form');
    return (
      <Form
        model={this.state.Post}
        store = {this.store}
        onSuccess = {this.handleSuccess.bind(this) } />
    );
  }
}

export default injectIntl(FormIndex);
