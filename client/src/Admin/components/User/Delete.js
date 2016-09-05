import React from 'react';
import {RestForm, Forms, DeliveryService} from 'react-at-rest';
import cookie from 'react-cookie';
import {browserHistory} from 'react-router';
import PubSub from 'pubsub-js';

import Roles from '../../../Common/config/RoleStore';
import UserStore from './Stores/UserStore';

export default class UserDelete extends React.Component {
  componentWillMount() {
    Roles.matchRoles(['authorized'],null, '/admin');
    const {id} = this.props.params;
    this.store = new UserStore('users');
    if (id) {
      this.store.destroyResource(id).then((data) => {
        PubSub.publish('NOTIFY', {
          autoDismiss: 3,
          dismissible: true,
          level: "error",
          message: "User Deleted",
          position: "br",
          title: "User Deleted"
        });
        browserHistory.push('/admin/users');
      });
    }
  }
  render() {
    return null;
  }
}
