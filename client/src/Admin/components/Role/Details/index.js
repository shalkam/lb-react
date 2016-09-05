import React from 'react';
import {DeliveryService, Store} from 'react-at-rest';
import {Panel} from 'react-bootstrap';

import FOut from './FOut';

export default class LessonPrepDetails extends DeliveryService {

  constructor(props) {
    super(props)
    //  create a new Store which connected to an API at / posts
    this.store = new Store('roles');
  }

  bindResources(props) {
    this.retrieveResource(this.store, { id: this.props.params.id });
  }

  render() {
    // # show a loading message while loading data
    if (!this.state.loaded) {
      return <span>Loading...</span>
    }
    const {role} = this.state;
    return <div>
      <Panel header={role.name}>
        <a className="btn btn-info pull-right hidden-print" href={'/admin/roles/' + role.id + '/edit'} >
          edit role
        </a>
        <FOut label="Role Name" data={role.name} />
        <FOut label="Role Description" data={role.description} />
      </Panel>
    </div>
  }
}
