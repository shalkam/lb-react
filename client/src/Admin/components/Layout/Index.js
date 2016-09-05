import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import Nav from './Nav';
import Header from './Header';
import Notify from '../../../Common/components/Notify';

import '../../../../public/assets/admin/css/bootstrap.min.css';
import '../../../../public/assets/admin/css/styles.css';

export default class Admin extends React.Component {
  render() {
    return <div>
      <Notify />
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            <Nav />
          </div>
          <div className="col-sm-9">
              {this.props.children}
          </div>
        </div>
      </div>
    </div>
  }
}
