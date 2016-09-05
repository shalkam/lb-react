import React from 'react';
import {RestForm, Forms, DeliveryService} from 'react-at-rest';
import cookie from 'react-cookie';
import {browserHistory} from 'react-router';
import PubSub from 'pubsub-js';
import shortid from 'shortid';

import Roles from '../../../../Common/config/RoleStore';
import UserForm from './UserForm';
import UserStore from '../Stores/UserStore';

export default class Form extends DeliveryService {
  componentWillMount() {
    Roles.matchRoles(['authorized'], '/admin');
    this.store = new UserStore('users');
  }

  bindResources(props) {
    if (this.props.params.id) {
      this.retrieveResource(this.store, { id: this.props.params.id });
    } else {
      this.setState({ user: { id: shortid.generate() }, loaded: true });
    }
  }

  handleSuccess(data) {
    const {id} = this.props.params;
    if (data && !id) {
      const {user} = data;
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: "success",
        message: "User Created Successfuly",
        position: "br",
        title: "User Created"
      });
      browserHistory.push('/admin/users/' + user.id);
    } else if (data && id) {
      const {user} = data;
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: "success",
        message: "User Updated Successfuly",
        position: "br",
        title: "User Updated"
      });
      browserHistory.push('/admin/users/' + user.id);
    } else {
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: "info",
        message: "User Submitted .. no changes were made",
        position: "br",
        title: "User Submitted"
      });
      browserHistory.push('/admin/users/' + this.state.user.id);
    }
  }

  render() {
    if (!this.state.loaded) {
      return <span>Loading...</span>
    }
    return (
      <UserForm
        model={this.state.user}
        store = {this.store}
        onSuccess = {this.handleSuccess.bind(this) } />
    );
  }
}
