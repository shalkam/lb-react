import React from 'react';
import {DeliveryService} from 'react-at-rest';
import {Pagination, Table, Button, Modal} from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';
import {injectIntl} from 'react-intl';
import qs from 'qs';
import PubSub from 'pubsub-js';
import StoreIndex from '../Stores'
import ACL from '../../../../Common/components/ACL';

class ListIndex extends DeliveryService {

  componentWillMount() {
    this.store = new StoreIndex('Posts');
    this.state = {
      count: this.store.getResource('count', {
        query: {
          where: qs.parse(this.props.location.search.substring(1))
        }
      }),
      perPage: 6,
      page: this.props.params.page ? Number.parseInt(this.props.params.page) : 1,
      showModal: {}
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
    const page = props.params.page ? Number.parseInt(props.params.page) : 1;
    this.setState({ page });
    const query = {
      filter: {
        limit: this.state.perPage,
        skip: this.state.perPage * (page - 1),
        where: qs.parse(this.props.location.search.substring(1)),
        include:['user']
      }
    }
    // # retrieve all the posts from the Post Store
    this.retrieveAll(this.store, { query });
  }

  paginate(eventKey) {
    this.props.history.push({
      pathname: '/lessons/page/' + eventKey,
    });
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

  render() {
    const {messages} = this.props.intl;
    // # show a loading message while loading data
    if (!this.state.loaded) {
      PubSub.publish('NOTIFY', {
          autoDismiss: false,
          dismissible: true,
          level: "info",
          message: messages['message.loading.body'],
          position: "br",
          title: messages['message.loading.title'],
          uid: 'loading-posts'
      });
      return null;
    }
    PubSub.publish('NOTIFY_REMOVE', 'loading-posts');
    const count = this.state.count._result && this.state.count._result.Post.count ? this.state.count._result.Post.count : 0;
    const totalPages = Math.floor(count / this.state.perPage);
    return <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>{messages['list.title']}</th>
          <th>{messages['list.user']}</th>
          <th>{messages['label.date']}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {this.state.Posts.map((post, index) => {
          return <tr key={post.id}>
            <td>{post.title}</td>
            <td>{post.user.username}</td>
            <td>{post.date}</td>
            <td>
            <Link to={"posts/" + post.id} className="btn btn-info">{messages['list.readMore']}</Link>
            <ACL roles={['admin']}>
              <Button onClick={this.openModal.bind(this, index) } bsStyle='danger'>{messages['list.delete']}</Button>
              <Modal show={this.state.showModal[index]} onHide={this.closeModal.bind(this, index)}>
                <Modal.Header closeButton>
                  <Modal.Title>{messages['list.delete.confirm']}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {messages['name']}: <b>{post.name}</b>
                </Modal.Body>
                <Modal.Footer>
                  <Link className='btn btn-danger' to={"posts/" + post.id + '/delete'}>{messages['list.delete.yes']}</Link>
                  <Button onClick={this.closeModal.bind(this,index) }>{messages['list.delete.close']}</Button>
                </Modal.Footer>
              </Modal>
            </ACL>
            </td>
          </tr>;
        }) }
        {count > this.state.perPage ? <tr>
          <td colspan='4'>
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

export default injectIntl(ListIndex);
