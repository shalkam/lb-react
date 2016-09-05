import React from 'react';
import Roles from '../../../Common/config/RoleStore';
import {Link} from 'react-router';

export default class LessonPrep extends React.Component {
  componentWillMount() {
    Roles.matchRoles(['authorized'], '/admin')
  }

  render() {
    return <div>
    <ul className="list-inline pull-right">
        <li>
          <Link to="/admin/roles/create" className="btn btn-success">
            <span className="glyphicon glyphicon-plus-sign"></span> Add Role
          </Link>
        </li>
      </ul>
      <Link to="/admin/roles"><strong><i className="glyphicon glyphicon-dashboard"></i> Roles</strong></Link>
      <hr />
      {this.props.children}
    </div>;
  }
};
