import React from 'react';
import {RestForm, Forms} from 'react-at-rest';
import {Button} from 'react-bootstrap';
import AbstractForm from '../../../../Common/abstracts/AbstractForm';

export default class UserForm extends AbstractForm {
  render() {
    return (<form onSubmit={this.handleSubmit}>
      <Forms.TextInput {...this.getFieldProps('firstName') }/>
      <Forms.TextInput {...this.getFieldProps('lastName') }/>
      <Forms.TextInput {...this.getFieldProps('username') }/>
      <Forms.TextInput {...this.getFieldProps('email') }/>
      <Forms.PasswordInput {...this.getFieldProps('password') }/>
      <Forms.PasswordInput {...this.getFieldProps('credentials.password') } label='Repeat Password'/>
      <Button bsStyle="primary" type="submit">Save</Button>
    </form>);
  }
}
