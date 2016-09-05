import React from 'react';
import {Link, browserHistory} from 'react-router';
import {DeliveryService, Store} from 'react-at-rest';
import {Pagination, Table, Button, ButtonGroup, Modal} from 'react-bootstrap';

export default class UsersList extends DeliveryService {

  componentWillMount() {
    this.store = new Store('users');
    this.state = {
      count: this.store.getResource('count'),
      perPage: 6,
      page: this.props.params.page ? Number.parseInt(this.props.params.page) : 1,
      showModal: []
    };
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
        skip: this.state.perPage * (page - 1)
      }
    }
    // # retrieve all the posts from the Post Store
    this.retrieveAll(this.store, { query });
  }

  openModal(index) {
    const showModal = this.state.showModal;
    showModal[index] = true;
    this.setState({ showModal });
  }

  closeModal(index) {
    const showModal = this.state.showModal;
    showModal[index] = false;
    this.setState({ showModal });
  }

  paginate(eventKey) {
    this.props.history.push({
      pathname: '/lessons/page/' + eventKey,
    });
  }

  render() {
    // # show a loading message while loading data
    if (!this.state.loaded) {
      return <span>Loading...</span>
    }
    const count = this.state.count._result && this.state.count._result.user.count ? this.state.count._result.user.count : 0;
    const totalPages = Math.floor(count / this.state.perPage);
    return <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>User name</th>
            <th>Email</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((user, index) => {
            return <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <ButtonGroup>
                  <Link to={"admin/users/" + user.id} className="btn btn-primary">view</Link>
                  <Link to={"admin/users/" + user.id + '/edit'} className="btn btn-info">edit</Link>
                  <Button onClick={this.openModal.bind(this, index) } bsStyle='danger'>delete </Button>
                </ButtonGroup>
                <Modal show={this.state.showModal[index]} onHide={this.closeModal.bind(this, index) }>
                  <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    User: <b>{user.username}</b>, will be deleted
                  </Modal.Body>
                  <Modal.Footer>
                    <Button href={"admin/users/" + user.id + '/delete'}>Yes</Button>
                    <Button onClick={this.closeModal.bind(this, index) }>Close</Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>;
          }) }
          {count > this.state.perPage ? <tr>
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
