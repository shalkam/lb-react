import React from 'react';
import {DeliveryService, Store} from 'react-at-rest';
import {Panel} from 'react-bootstrap';

import FOut from './FOut';

export default class UserDetails extends DeliveryService {

  constructor(props) {
    super(props)
    //  create a new Store which connected to an API at / posts
    this.store = new Store('users');
  }

  bindResources(props) {
    this.retrieveResource(this.store, { id: this.props.params.id });
  }

  render() {
    // # show a loading message while loading data
    if (!this.state.loaded) {
      return <span>Loading...</span>
    }
    const {user} = this.state;
    return <div>
      <Panel header={user.username}>
        <a className="btn btn-info pull-right hidden-print" href={'/admin/users/' + user.id + '/edit'} >
          edit user
        </a>
        <FOut label="id" data={user.id} />
        <FOut label="User Name" data={user.username} />
        <FOut label="First name" data={user.firstName} />
        <FOut label="Last name" data={user.lastName} />
        <FOut label="Email" data={user.email} />
      </Panel>
    </div>
  }
}
