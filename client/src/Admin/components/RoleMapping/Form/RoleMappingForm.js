import React from 'react';
import {Forms} from 'react-at-rest';
import {Button, Label} from 'react-bootstrap';
import Multiselect from '../../../../Common/form-elements/react-widgets/Multiselect';
import AbstractForm from '../../../../Common/abstracts/AbstractForm';

export default class RoleMappingForm extends AbstractForm {
  render() {
    return (<form onSubmit={this.handleSubmit}>
      <h3>
        <Label bsStyle="primary">Edit {this.props.model.username} roles</Label>
      </h3>
      <Multiselect
        {...this.getFieldProps('roles') }
        valueField='id'
        textField='name'
        data={this.props.roles}/>
      <Button bsStyle="primary" type="submit">Save</Button>
    </form>);
  }
}
