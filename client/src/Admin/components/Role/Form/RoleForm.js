import React from 'react';
import {RestForm, Forms} from 'react-at-rest';
import {Button} from 'react-bootstrap';
import AbstractForm from '../../../../Common/abstracts/AbstractForm';

export default class RoleForm extends AbstractForm {
  render() {
    return (<form onSubmit={this.handleSubmit}>
      <Forms.TextInput {...this.getFieldProps('name') }/>
      <Forms.TextAreaInput {...this.getFieldProps('description') }/>
      <Button bsStyle="primary" type="submit">Save</Button>
    </form>);
  }
}
