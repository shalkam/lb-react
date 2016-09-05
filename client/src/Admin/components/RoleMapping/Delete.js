import React from 'react';
import cookie from 'react-cookie';
import {browserHistory} from 'react-router';
import PubSub from 'pubsub-js';

import RoleMappingStore from './Store';

export default class RoleMappingDelete extends React.Component {
  componentWillMount() {
    const {id} = this.props.params;
    this.store = new RoleMappingStore('role_mapping');
    if (id) {
      this.store.destroyResource(id).then((data) => {
        PubSub.publish('NOTIFY', {
          autoDismiss: 3,
          dismissible: true,
          level: "error",
          message: "RoleMap Deleted",
          position: "br",
          title: "RoleMap Deleted"
        });
        browserHistory.push('/admin/roleMappings');
      });
    }
  }
  render() {
    return null;
  }
}
