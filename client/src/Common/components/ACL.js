import React from 'react';
import Roles from '../config/RoleStore';
import {Store} from 'react-at-rest';
import PubSub from 'pubsub-js';

class ACL extends React.Component {

    constructor(props) {
        super(props)
        this.state = { authorized: false };
    }

    componentWillMount() {
        if (Roles.matchRoles(this.props.roles, null, this.props.path)) {
            this.setState({ authorized: true });
        }
        PubSub.subscribe("LOGGED_OUT", this.logoutHandler.bind(this));
        PubSub.subscribe("LOGGED_IN", this.loginHandler.bind(this));
    }

    logoutHandler(msg, data) {
        this.setState({ authorized: false })
        if (Roles.matchRoles(this.props.roles, null, this.props.path)) {
            this.setState({ authorized: true });
        }
    }

    loginHandler(msg, data) {
        this.setState({ authorized: false })
        if (Roles.matchRoles(this.props.roles, null, this.props.path)) {
            this.setState({ authorized: true });
        }
    }

    render() {
        const WrapperTag = this.props.WrapperTag ? this.props.WrapperTag : `div`;
        if (this.state.authorized) {
            return <WrapperTag {...this.props}>
                {this.props.children}
            </WrapperTag>
        } else {
            return null;
        }
    }
}
ACL.defaultProps = { path: '/' };
export default ACL;
