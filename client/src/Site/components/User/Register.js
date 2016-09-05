import React from 'react';
import {Store} from 'react-at-rest';

import RegisterForm from './Forms/RegisterForm';


export default class Register extends React.Component {

    constructor() {
        super();
        this.userStore = new Store('users');
    }
    
    handleSuccess(user) {
        console.log(user);
        window.location = "/users/#{user.id}"
    }
    
    render() {
        return <RegisterForm
            store = {this.userStore}
            onSuccess = {this.handleSuccess.bind(this) } />
    }
}