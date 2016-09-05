import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return <div id="top-nav" className="navbar navbar-inverse navbar-static-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link to="/admin" className="navbar-brand">Dashboard</Link>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/admin/users/logout"><i className="glyphicon glyphicon-lock" /> Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  }
}
