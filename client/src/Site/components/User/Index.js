import React from 'react';
import {IntlProvider, injectIntl} from 'react-intl';
import i18n from './i18n';

class User extends React.Component {
    render() {
        const {locale} = this.props.intl;
        const messages = i18n[locale];
        return <IntlProvider locale={locale} key={locale} messages={messages}>
         <div>
            {this.props.children}
        </div>
        </IntlProvider>;
    }
};

export default injectIntl(User);
