import React from 'react';
import {injectIntl} from 'react-intl';

class Home extends React.Component {
  render() {
    const {messages} = this.props.intl;
    return <div>
    Home Page Content goes here
    </div>;
  }
}

export default injectIntl(Home);
