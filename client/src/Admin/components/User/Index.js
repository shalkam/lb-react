import React from 'react';
import {Link} from 'react-router';

export default class User extends React.Component {
  render() {
    return <div>
      <ul className="list-inline pull-right">
        <li>
          <Link to="/admin/users/create" className="btn btn-success">
            <span className="glyphicon glyphicon-plus-sign"></span> Add User
          </Link>
        </li>
      </ul>
      <Link to="/admin/users"><strong><i className="glyphicon glyphicon-dashboard"></i> Users</strong></Link>
      <hr />
      {this.props.children}
    </div>;
  }
};
