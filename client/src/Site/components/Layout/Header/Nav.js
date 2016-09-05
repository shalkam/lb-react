import React from 'react';
import {Link, withRouter} from 'react-router';
import {injectIntl} from 'react-intl';
import {Modal, Button} from 'react-bootstrap';

import routes from '../../../Routes.js';
import ACL from '../../../../Common/components/ACL';
import Login from '../../User/Login';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }
  close(e) {
    e.preventDefault();
    this.setState({ showModal: false });
  }

  open(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }
  render() {
    const {messages} = this.props.intl;
    return <div className="navigation hidden-print">
      <Modal bsSize="small" className='no-header' show={this.state.showModal} onHide={this.close.bind(this) }>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div style={{
            padding: 10,
            textAlign: 'center'
          }}>
            <Login />
          </div>
        </Modal.Body>
      </Modal>
      <div className="container">
        <div className="logo">
          <h1>
            <Link to="/">
                {messages['app.name']}
            </Link>
          </h1>
        </div>
        <div className="navigation-right">
          <span className="menu"><img src="/public/images/menu.png" alt=" " /></span>
          <nav className="link-effect-3" id="link-effect-3">
            <ul className="nav1 nav nav-wil">
              <li className={this.props.router.isActive('/', true) ? 'active' : ''} >
                <Link to="/" data-hover={messages['app.home']} className="scroll">{messages['app.home']}</Link>
              </li>
              <li className={this.props.router.isActive('/posts') ? 'active' : ''}>
                <Link to="posts" data-hover={messages['app.posts']} className="scroll">{messages['app.posts']}</Link>
              </li>
              <ACL roles={['guest']} WrapperTag='li' WrapperProps={{ className: this.props.router.isActive('/user') ? 'active' : '' }} >
                <a href='#' onClick={this.open.bind(this) } data-hover={messages['app.login']} className="scroll">{messages['app.login']}</a>
              </ACL>
              <ACL roles={['authorized']} WrapperTag='li' WrapperProps={{ className: this.props.router.isActive('/user') ? 'active' : '' }} >
                <Link to="user/logout" data-hover={messages['app.logout']} className="scroll">{messages['app.logout']}</Link>
              </ACL>
            </ul>
          </nav>
        </div>
        <div className="clearfix" />
      </div>
    </div>
  }
}
export default injectIntl(withRouter(Nav));
