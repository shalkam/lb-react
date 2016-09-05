import React from 'react';

import Roles from '../../../Common/config/RoleStore';

export default class Dashboard extends React.Component {
  componentWillMount() {
    Roles.matchRoles(['admin'], '/admin/users/logout', '/admin')
  }

  render () {
    return <div>
    this is dashboard
    </div>;
  }
}
