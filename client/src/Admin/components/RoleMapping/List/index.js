import React from 'react';
import {Link, browserHistory} from 'react-router';
import {DeliveryService} from 'react-at-rest';
import {Pagination, Button, Label, Table} from 'react-bootstrap';
import StoreIndex from '../Store'

export default class RoleMappingsList extends DeliveryService {

  componentWillMount() {
    this.store = new StoreIndex('users');
    this.state = {
      count: 0,
      perPage: 6,
      page: this.props.params.page ? Number.parseInt(this.props.params.page) : 1,
      showModal: []
    };
    this.store.getResource('count').then((data) => this.setState({ count: data.user.count }));
  }

  componentWillReceiveProps(props) {
    const pageChanged = (Number.parseInt(props.params.page) !== this.state.page);
    if (pageChanged) {
      this.setState({ loaded: false });
      this.stopPolling()
      this.stopListeningToBoundResources()
      this.boundResources = []
      this.bindResources(props)
      if (this.boundResources.length) this.getResources()
    }
    return pageChanged;
  }
  // # override bindResources to load all the resources needed for this component
  bindResources(props) {
    const page = props.params.page ? Number.parseInt(props.params.page) : 1
    this.setState({ page });
    const query = {
      filter: {
        limit: this.state.perPage,
        skip: this.state.perPage * (page - 1),
        include: ['roles']
      }
    }
    // # retrieve all the posts from the Post Store
    this.retrieveAll(this.store, { query });
  }

  paginate(eventKey) {
    this.props.history.push({
      pathname: '/roleMappings/page/' + eventKey,
    });
  }

  render() {
    // # show a loading message while loading data
    if (!this.state.loaded) {
      return <span>Loading...</span>
    }
    const totalPages = Math.floor(this.state.count / this.state.perPage);
    return <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>User name</th>
          <th>Roles</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {this.state.users.map((user, index) => {
          return <tr key={user.id}>
            <td>{user.username}</td>
            <td>
              {user.roles.map((role, i) => {
                return <Label bsStyle="primary" style={{ margin: 5 }}>{role.name}</Label>
              }) }
            </td>
            <td>
              <Link to={"admin/roleMappings/" + user.id + '/edit'} className="btn btn-info">edit </Link>
            </td>
          </tr>;
        }) }
        {this.state.count > this.state.perPage ? <tr>
          <td colspan='3'>
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={totalPages}
              maxButtons={5}
              activePage={this.state.page}
              onSelect={this.paginate.bind(this) } />
          </td>
        </tr> : ''}
      </tbody>
    </Table>
  }
}
