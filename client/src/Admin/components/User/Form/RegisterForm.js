import React from 'react';
import {RestForm, Forms} from 'react-at-rest';

export default class RegisterForm extends RestForm {
    render() {
        return <form onSubmit={this.handleSubmit.bind(this) }>
            <Forms.TextInput {...this.getFieldProps('username') } />
            <Forms.TextInput {...this.getFieldProps('email') } />
            <Forms.PasswordInput {...this.getFieldProps('password') } />
            <button>Login</button>
        </form>
    }
}