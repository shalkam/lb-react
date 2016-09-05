import React from 'react';
import {Store} from 'react-at-rest';
import cookie from 'react-cookie';

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state =  { token: cookie.load('token') };
    }
    render() {
        return <div>
        {this.state.token.id}
        </div>
    }
}