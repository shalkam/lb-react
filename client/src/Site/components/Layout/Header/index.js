import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {injectIntl} from 'react-intl';
import {withRouter} from 'react-router';
import Nav from './Nav';

class Header extends React.Component {
  constructor() {
    super();
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
    const {locale, messages} = this.props.intl;
    return <div data-vide-bg="public/video/srix" style={{ marginBottom: 20 }} className='top'>
      {this.props.router.isActive('/', true) ? <div className='vidContainer'>
        <video autoPlay={true} loop={true} muted={true}>
          <source src="video/srix.mp4" type="video/mp4"/>
          <source src="video/srix.webm" type="video/webm"/>
          <source src="video/srix.ogv" type="video/ogg"/>
        </video>
      </div> : null}
      {this.props.router.isActive('/', true) ? <nav>
        <div className="center-container">
          <Nav />
          <div className="w3ls_banner_info">
            <div className="container">
              <div class="w3l_banner_logo">
                <h2>S</h2>
              </div>
              <h3>education brings about opportunity, and in turn inspiration</h3>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <div className="more">
                <a href="#" className="hvr-underline-from-center" onClick={this.open.bind(this) }>{messages['readMore']}</a>
              </div>
              <Modal show={this.state.showModal} onHide={this.close.bind(this) } className={locale === 'ar' ? 'rtl' : ''}>
                <Modal.Header closeButton>
                  <Modal.Title>Education</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <img src="images/11.jpg" alt=" " className="img-responsive" />
                  <p>Ut enim ad minima veniam, quis nostrum
                    exercitationem ullam corporis suscipit laboriosam,
                    nisi ut aliquid ex ea commodi consequatur?Quis autem
                    vel eum iure reprehenderit qui in ea voluptate velit
                    esse quam nihil molestiae consequatur, vel illum qui
                    dolorem eum fugiat quo voluptas nulla pariatur.
                    <i>" Quis autem vel eum iure reprehenderit qui in ea voluptate velit
                      esse quam nihil molestiae consequatur.</i></p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.close.bind(this) }>اغلاق</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </nav> : <Nav />}
    </div>
  }
}

export default injectIntl(withRouter(Header));
