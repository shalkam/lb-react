import React from 'react';
import {RestForm, Forms} from 'react-at-rest';
import {Modal, Button} from 'react-bootstrap';

export default class LoginForm extends RestForm {
  render() {
    return <form onSubmit={this.handleSubmit}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>تسجيل الدخول</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Forms.TextInput {...this.getFieldProps('email') } />
          <Forms.PasswordInput {...this.getFieldProps('password') } />
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="primary" type="submit">تسجيل الدخول</Button>
        </Modal.Footer>

      </Modal.Dialog>
    </form>
  }
}
