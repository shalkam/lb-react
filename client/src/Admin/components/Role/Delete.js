import React from 'react';
import {RestForm, Forms, DeliveryService} from 'react-at-rest';
import cookie from 'react-cookie';
import {browserHistory} from 'react-router';
import PubSub from 'pubsub-js';

import Roles from '../../../Common/config/RoleStore';
import RoleStore from './Stores/RoleStore';

export default class RoleDelete extends React.Component {
  componentWillMount() {
    Roles.matchRoles(['authorized'], '/admin');
    const {id} = this.props.params;
    this.store = new RoleStore('roles');
    if (id) {
      this.store.destroyResource(id).then((data) => {
        PubSub.publish('NOTIFY', {
          autoDismiss: 3,
          dismissible: true,
          level: "error",
          message: "Role Deleted",
          position: "br",
          title: "Role Deleted"
        });
        browserHistory.push('/admin/roles');
      });
    }
  }
  render() {
    return null;
  }
}
