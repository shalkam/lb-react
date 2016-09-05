import React from 'react';
import {RestForm, Forms, DeliveryService} from 'react-at-rest';
import cookie from 'react-cookie';
import {browserHistory} from 'react-router';
import PubSub from 'pubsub-js';
import shortid from 'shortid';

import Roles from '../../../../Common/config/RoleStore';
import RoleForm from './RoleForm';
import RoleStore from '../Stores/RoleStore';

export default class Form extends DeliveryService {
  componentWillMount() {
    Roles.matchRoles(['authorized'], '/admin');
    this.store = new RoleStore('roles');
  }

  bindResources(props) {
    if (this.props.params.id) {
      this.retrieveResource(this.store, { id: this.props.params.id });
    } else {
      this.setState({ role: { id: shortid.generate() }, loaded: true });
    }
  }

  handleSuccess(data) {
    const {id} = this.props.params;
    if (data && !id) {
      const {role} = data;
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: "success",
        message: "Role Created Successfuly",
        position: "br",
        title: "Role Created"
      });
      browserHistory.push('/admin/roles/' + role.id);
    } else if (data && id) {
      const {role} = data;
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: "success",
        message: "Role Updated Successfuly",
        position: "br",
        title: "Role Updated"
      });
      browserHistory.push('/admin/roles/' + role.id);
    } else {
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: "info",
        message: "Role Submitted .. no changes were made",
        position: "br",
        title: "Role Submitted"
      });
      browserHistory.push('/admin/roles/' + this.state.role.id);
    }
  }

  render() {
    if (!this.state.loaded) {
      return <span>Loading...</span>
    }
    return (
      <RoleForm
        model={this.state.role}
        store = {this.store}
        onSuccess = {this.handleSuccess.bind(this) } />
    );
  }
}
