import React from 'react';
import Roles from '../../../Common/config/RoleStore';
import {Link} from 'react-router';

export default class LessonPrep extends React.Component {
  componentWillMount() {
    Roles.matchRoles(['admin'], '/admin')
  }

  render() {
    return <div>
      <ul className="list-inline pull-right">
        <li>
        </li>
      </ul>
      <Link to="/admin/roleMappings">
        <strong>
          <i className="glyphicon glyphicon-dashboard"></i> Role Mapping
        </strong>
      </Link>
      <hr />
      {this.props.children}
    </div>;
  }
};
