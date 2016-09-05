import React from 'react';
import {Button, Collapse} from 'react-bootstrap';
import {Link, withRouter} from 'react-router';

class Nav extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      users: this.props.router.isActive('/admin/users') ||
      this.props.router.isActive('/admin/roles') ||
      this.props.router.isActive('/admin/roleMappings')
    };
  }

  render() {
    return <div>
      <Link to='/'><strong><i className="glyphicon glyphicon-eye-open" /> View Website</strong></Link>
      <hr />
      <Link to='/admin'><strong><i className="glyphicon glyphicon-wrench" /> Administration</strong></Link>
      <hr />
      <ul className="nav nav-stacked">
        <li className="nav-header">
          <a style={{ cursor: 'pointer' }} onClick={ () => this.setState({ users: !this.state.users }) }>
            Users Manager <i className={this.state.users ? 'glyphicon glyphicon-chevron-down pull-right' : 'glyphicon glyphicon-chevron-right pull-right'} />
          </a>
          <Collapse in={this.state.users}>
            <div>
              <ul className="nav nav-stacked">
                <li className={this.props.router.isActive('/admin/users') ? 'active' : ''}>
                  <Link to='/admin/users'><i className="glyphicon glyphicon-user" /> Users</Link>
                </li>
                <li className={this.props.router.isActive('/admin/roles') ? 'active' : ''}>
                  <Link to='/admin/roles'><i className="glyphicon glyphicon-flag" /> Roles</Link>
                </li>
                <li className={this.props.router.isActive('/admin/roleMappings') ? 'active' : ''}>
                  <Link to='/admin/roleMappings'><i className="glyphicon glyphicon-cog" /> Role Mapping</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
      </ul>
    </div>
  }
}

export default withRouter(Nav);
