import React from 'react';
import {Grid, Row, Col, Modal} from 'react-bootstrap';
import PubSub from 'pubsub-js';
import {browserHistory} from 'react-router';
import {IntlProvider, addLocaleData} from 'react-intl';
import arLocaleData from 'react-intl/locale-data/ar';

import Contact from './Contact';
import Header from './Header';
import Login from '../User/Login';
import i18n from '../../i18n';
// load css
import '../../../../public/css/bootstrap.css';
import '../../../../public/css/bootstrap-rtl.min.css';
import '../../../../public/css/style.css';
import '../../../../public/css/style-rtl.css';
import '../../../../public/css/fa/css/font-awesome.min.css';
import '../../../../public/css/bootstrap-theme.css';
import '../../../../public/css/print.css';
import '../../../../public/css/droid-kufi.css';
import '../../../../public/fonts/Gloria.css';
import '../../../../public/fonts/OpenSans.css';
import '../../../../public/fonts/Roboto.css';

addLocaleData(arLocaleData);

export default class Layout extends React.Component {
  handleUnauth(message, data) {
      browserHistory.push(data.redirect);
      const messages = i18n[this.state.locale];
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: 'warning',
        message: messages['message.unauth.body'],
        position: 'br',
        title: messages['message.unauth.title']
      });
  }
  componentWillMount() {
    PubSub.subscribe('LOADING', (msg, loading) => { this.setState({loading}); } );
    PubSub.subscribe('UNAUTH', this.handleUnauth.bind(this));
    this.setState({ locale: 'ar', rtl: 'rtl-container', loading: false });
  }
  handleLocaleChange(e) {
    console.log(e.target.getAttribute('value'));
    if (e.target.value === 'ar')
      this.setState({ locale: e.target.getAttribute('value'), rtl: 'rtl-container' });
    else
      this.setState({ locale: e.target.getAttribute('value'), rtl: '' });
  }
  render() {
    const messages = i18n[this.state.locale];
    if (this.state.loading) {
      PubSub.publish('NOTIFY', {
          autoDismiss: false,
          dismissible: true,
          level: 'info',
          message: messages['message.loading.body'],
          position: 'br',
          title: messages['message.loading.title'],
          uid: 'loading-component'
      });
      return null;
    }
    PubSub.publish('NOTIFY_REMOVE', 'loading-component');
    return <IntlProvider locale={this.state.locale} key={this.state.locale} messages={messages}>
      <div className={this.state.rtl}>
      <div className="hidden-print lang-select" style={{
            position: 'absolute',
            zIndex: 1,
            left: this.state.locale==='ar'?'15px':'',
            right: this.state.locale==='ar'?'':'15px'
        }}>
        <img onClick={this.handleLocaleChange.bind(this) } value='en' src="/images/flags/gb.svg" alt={messages['locale.en']} title={messages['locale.en']} />
        <img onClick={this.handleLocaleChange.bind(this) } value='ar' src="/images/flags/ae.svg" alt={messages['locale.ar']} title={messages['locale.ar']} />
      </div>
        <Grid fluid>
          <Row className='show-grid'>
            <Col xs={12} md={12}>
              <Header />
            </Col>
          </Row>
          <Row className='show-grid'>
            <Col xs={12} md={12}>
              {this.props.children}
            </Col>
          </Row>
          <Row className='show-grid'>
            <Col xs={12} md={12}>
              <Contact />
            </Col>
          </Row>
        </Grid>
      </div>
    </IntlProvider>
  }
}
