import React from 'react';
import {DeliveryService} from 'react-at-rest';
import {Panel} from 'react-bootstrap';
import {injectIntl} from 'react-intl';
import PubSub from 'pubsub-js';

import StoreIndex from '../Stores';
import FOut from './FOut';

class DetailsIndex extends DeliveryService {

  constructor(props) {
    super(props)
    //  create a new Store which connected to an API at / Post
    this.store = new StoreIndex('Posts');
  }

  bindResources(props) {
    this.retrieveResource(this.store, { id: this.props.params.id });
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
          uid: 'loading-lessonprep-details'
      });
      return null;
    }
    PubSub.publish('NOTIFY_REMOVE', 'loading-lessonprep-details');
    const {Post} = this.state;
    let date = null;
    if(Post.date) {
      date = new Date(Post.date);
      let dd = date.getDate();
      let mm = date.getMonth() + 1; //January is 0!

      var yyyy = date.getFullYear();
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      date = dd + '/' + mm + '/' + yyyy;
    }
    return <div>
      <Panel header={messages['section.base']} className='no-pb'>
        <a className="btn btn-info pull-left hidden-print" href={'/posts/' + Post.id + '/edit'} >
          {messages['details.edit']}
        </a>
        <FOut label={messages['label.title']} data={Post.title} />
        <FOut label={messages['label.date']} data={date} />
        <FOut label={messages['label.text']} data={Post.text} />
      </Panel>
    </div>
  }
}

export default injectIntl(DetailsIndex);
