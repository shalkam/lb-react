import React from 'react';
import {RestForm, Forms, DeliveryService, Store} from 'react-at-rest';
import cookie from 'react-cookie';
import {browserHistory} from 'react-router';
import PubSub from 'pubsub-js';
import shortid from 'shortid';

import RoleMappingForm from './RoleMappingForm';
import StoreIndex from '../Store';

export default class Form extends DeliveryService {
  componentWillMount() {
    const {id} = this.props.params;
    this.store = new StoreIndex('users');
    this.roleStore = new StoreIndex('roles');
    this.setState({ roles: [] });
    this.roleStore.getAll().then((data) => this.setState({ roles: data.roles }));
  }

  bindResources(props) {
    if (this.props.params.id) {
      const query = {
        filter: {
          include: ['roles']
        }
      }
      this.retrieveResource(this.store, { id: this.props.params.id, query });
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
        message: "Role Created Successfuly",
        position: "br",
        title: "Role Created"
      });
      browserHistory.push('/admin/roleMappings');
    } else if (data && id) {
      const {user} = data;
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: "success",
        message: "Role Updated Successfuly",
        position: "br",
        title: "Role Updated"
      });
      browserHistory.push('/admin/roleMappings');
    } else {
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: "info",
        message: "Role Submitted .. no changes were made",
        position: "br",
        title: "Role Submitted"
      });
      browserHistory.push('/admin/roleMappings');
    }
  }

  render() {
    if (!this.state.loaded && this.props.params.id) {
      return <span>Loading...</span>
    }
    return (
      <RoleMappingForm
        model={this.state.user}
        store = {this.store}
        roles={this.state.roles}
        onSuccess = {this.handleSuccess.bind(this) } />
    );
  }
}
