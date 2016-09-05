import React from 'react';
import {DeliveryService, Store} from 'react-at-rest';
import {Panel} from 'react-bootstrap';

import FOut from './FOut';

export default class RoleMappingDetails extends DeliveryService {

  constructor(props) {
    super(props)
    //  create a new Store which connected to an API at / posts
    this.store = new Store('role_mapping');
  }

  bindResources(props) {
    const query = {
      id: this.props.params.id,
      filter: {
        include:['user', 'role']
      }
    }
    this.retrieveResource(this.store, query);
  }

  render() {
    // # show a loading message while loading data
    if (!this.state.loaded) {
      return <span>Loading........</span>
    }
    const {role_mapping} = this.state;
    return <div>
      <Panel header="المعلومات الاساسية">
        <a className="btn btn-info pull-left hidden-print" href={'/admin/roleMappings/' + role_mapping.id + '/edit'} >
          edit role
        </a>
        <FOut label="Role Id" data={role_mapping.roleId} />
        <FOut label="Principal Type" data={role_mapping.principalType} />
        <FOut label="Principal Id" data={role_mapping.principalId} />
      </Panel>
    </div>
  }
}
