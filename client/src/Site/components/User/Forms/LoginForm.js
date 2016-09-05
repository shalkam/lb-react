import React from 'react';
import {RestForm, Forms} from 'react-at-rest';
import {injectIntl} from 'react-intl';
class LoginForm extends RestForm {
    render() {
      const {messages} = this.props.intl;
      return <form onSubmit={this.handleSubmit}>
      <Forms.TextInput {...this.getFieldProps('email')} label={messages['label.email']}/>
      <Forms.PasswordInput {...this.getFieldProps('password') } label={messages['label.password']}/>
      <button type='submit' className='btn btn-success'>{messages['label.login']}</button>
    </form>
    }
}

export default injectIntl(LoginForm);
